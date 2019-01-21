const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")
const admin = require("firebase-admin")
const mkdirp = require("mkdirp-promise")
const spawn = require("child-process-promise").spawn
const path = require("path")
const os = require("os")
const fs = require("fs")
const serviceAccount = require("./firebase-admin-key.json")

const JPEG_EXTENSION = ".jpg"
const S_THUMB_POSTFIX = "_S_THUMB"
const M_THUMB_POSTFIX = "_M_THUMB"
const L_THUMB_POSTFIX = "_L_THUMB"

const signedURLConfig = {
	action: "read",
	expires: "03-01-2500"
}

const GCP_STORAGE_BUCKET = "streetwear-app.appspot.com"
const DATABASE_URL = "https://streetwear-app.firebaseio.com"

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const ALGOLIA_INDEX_NAME = "dev_items"

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: DATABASE_URL,
	storageBucket: GCP_STORAGE_BUCKET
})

const bucket = admin.storage().bucket()

// ------------------------------------
// -------- Algolia Index Sync --------
// ------------------------------------

exports.onItemCreated = functions.firestore
	.document(`items/{itemId}`)
	.onCreate((snap, context) => {
		// Get the item document
		const item = snap.data()

		// Add an 'objectID' field which Algolia requires
		item.objectID = context.params.itemId

		// Write to the algolia index
		const index = client.initIndex(ALGOLIA_INDEX_NAME)
		return index.saveObject(item)
	})

exports.onItemUpdated = functions.firestore
	.document(`items/{itemId}`)
	.onUpdate((snap, context) => {
		// Get the item document
		const item = snap.after.data()

		// Add an 'objectID' field which Algolia requires
		item.objectID = context.params.itemId

		// Write to the algolia index
		const index = client.initIndex(ALGOLIA_INDEX_NAME)
		return index.saveObject(item)
	})

exports.onItemDeleted = functions.firestore
	.document(`items/{itemId}`)
	.onDelete((snap, context) => {
		// Get the object id
		const objectID = context.params.itemId

		// Remove item with the corresponding id
		const index = client.initIndex(ALGOLIA_INDEX_NAME)
		return index.deleteObject(objectID)
	})

// ------------------------------------
// ---------- Items handling ----------
// ------------------------------------

// When an item is removed from db remove its images from storage
exports.removeItemImages = functions.firestore
	.document(`items/{itemId}`)
	.onDelete(async (snap) => {
		const data = snap.data()
		let successCount = 0
		let failureCount = 0

		const removeFile = async (name) => {
			try {
				const t = Date.now()
				await bucket.file(name).delete()
				console.log(`Deleted ${name} in ${Date.now() - t}ms`)
				successCount++
			} catch (err) {
				console.error(
					`There was a problem with deleting ${name} it might not have been deleted`,
					err
				)
				failureCount++
			}
		}

		const res = await Promise.all(
			data.attachments.map(async (ref) => {
				await removeFile(ref)
				await removeFile(ref + S_THUMB_POSTFIX)
				await removeFile(ref + M_THUMB_POSTFIX)
				await removeFile(ref + L_THUMB_POSTFIX)
			})
		)

		console.log(`Success: ${successCount}, Failure: ${failureCount}`)
		return res
	})

// ------------------------------------
// ---------- User handling -----------
// ------------------------------------

// When a user is deleted from db their items are removed from the db
exports.removeUserItems = functions.firestore
	.document(`users/{userId}`)
	.onDelete((snap, context) => {
		const db = admin.firestore()
		const data = snap.data()
		data.items.forEach((item) => {
			db.collection("items")
				.doc(item)
				.delete()
				.then(() => {
					console.log(`deleted ${item}`)
				})
				.catch((err) => console.log(err))
		})
	})

// When an authUser is deleted the corresponding user is removed from db
exports.userDbCleanup = functions.auth.user().onDelete((user, ...rest) => {
	const userId = user.uid
	const db = admin.firestore()
	db.collection("users")
		.doc(userId)
		.delete()
		.then(() => {
			console.log(`user ${userId} was deleted`)
		})
		.catch((err) => console.log(err))
})

// TODO: When an authUser is created create a corresponding user in db
exports.onUserCreated = functions.auth.user().onCreate((...args) => {
	console.log("args", args)
})

// ------------------------------------
// ---------- Image handling ----------
// ------------------------------------

const generateThumbnail = (size, pathFrom, pathTo) => {
	return spawn("convert", [pathFrom, "-thumbnail", size, pathTo], {
		capture: ["stdout", "stderr"]
	})
}

const uploadThumbnail = async (file, path) => {
	await bucket.upload(file, {
		destination: path,
		contentType: "image/jpeg",
		public: true,
		gzip: true,
		metadata: {
			cacheControl: "public, max-age=31536000"
		}
	})
	return bucket.file(path).getSignedUrl(signedURLConfig)
}

const processImage = async (object, sizes) => {
	const filePath = object.name

	if (filePath.endsWith("THUMB")) {
		console.log("File is already a thumbnail")
		return false
	}

	const baseFileName = path.basename(filePath, path.extname(filePath))
	const fileDir = path.dirname(filePath)
	const tempLocalFile = path.join(os.tmpdir(), filePath)
	const tempLocalDir = path.dirname(tempLocalFile)

	// Temp JPEG
	const JPEGFilePath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION })
	)
	let tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath)

	// Temp Small Thumbnail
	const thumbSPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + S_THUMB_POSTFIX })
	)
	const tempLocalThumbSFile = path.join(os.tmpdir(), thumbSPath)

	// Temp Medium Thumbnail
	const thumbMPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + M_THUMB_POSTFIX })
	)
	const tempLocalThumbMFile = path.join(os.tmpdir(), thumbMPath)

	// Temp Large Thumbnail
	const thumbLPath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName + L_THUMB_POSTFIX })
	)
	const tempLocalThumbLFile = path.join(os.tmpdir(), thumbLPath)

	// Exit if this is triggered on a file that is not an image.
	if (!object.contentType.startsWith("image/")) {
		console.log(`This file is not an image (${object.contentType}`)
		return null
	}

	// Create the temp directory where the storage file will be downloaded
	await mkdirp(tempLocalDir)

	// Download file from bucket
	await bucket.file(filePath).download({ destination: tempLocalFile })

	// Only convert files that aren't already a JPEG
	if (!object.contentType.startsWith("image/jpeg")) {
		// Convert the image to JPEG using ImageMagick.
		await spawn("convert", [tempLocalFile, tempLocalJPEGFile])

		// Remove the original file
		await bucket.file(filePath).delete()

		// Upload the JPEG image (To the location of the original file)
		await bucket.upload(tempLocalJPEGFile, { destination: filePath })
	} else {
		// If the file is already a jpeg point the JPEGFile to its location
		tempLocalJPEGFile = tempLocalFile
	}

	// Generate thumbnails using ImageMagick
	await generateThumbnail(sizes[0], tempLocalJPEGFile, tempLocalThumbSFile)
	await generateThumbnail(sizes[1], tempLocalJPEGFile, tempLocalThumbMFile)
	await generateThumbnail(sizes[2], tempLocalJPEGFile, tempLocalThumbLFile)

	// Upload the thumbnails
	const signedURLs = await Promise.all([
		bucket.file(filePath).getSignedUrl(signedURLConfig),
		uploadThumbnail(tempLocalThumbSFile, thumbSPath),
		uploadThumbnail(tempLocalThumbMFile, thumbMPath),
		uploadThumbnail(tempLocalThumbLFile, thumbLPath)
	])

	// Once the image has been converted delete the local files to free up disk space.
	// "tempLocalFile" is not unlinked as the "tempLocalJPEGFile" is saved to that same location
	fs.unlinkSync(tempLocalJPEGFile)
	fs.unlinkSync(tempLocalThumbSFile)
	fs.unlinkSync(tempLocalThumbMFile)
	fs.unlinkSync(tempLocalThumbLFile)

	return signedURLs
}

const writeUrlsToDb = async (userId, urls) => {
	const profilePictureURLs = urls.map((result, i) => {
		console.log(`url ${i}:`, result)
		return result[0]
	})

	// Add the URLs to the Database
	const db = admin.firestore()
	return db
		.collection("users")
		.doc(userId)
		.update({ profilePictureURLs })
}

// On image upload create convert image to JPEG and create thumbnails
// to save on bandwith and improve performance
exports.processImage = functions.storage.object().onFinalize(async (file) => {
	if (file.name.includes("attachments/")) {
		console.log("Processing an attachment...")
		return await processImage(file, ["110x110", "320x320", "650x650"])
	} else if (file.name.includes("profile-pictures/")) {
		console.log("Processing a profile picture...")
		const urls = await processImage(file, ["60x60", "110x110", "230x230"])
		console.log("urls: ", urls)
		if (urls) {
			const userId = file.name.split("/")[1]
			console.log("userId", userId)
			await writeUrlsToDb(userId, urls)
		}
		return
	}
})
