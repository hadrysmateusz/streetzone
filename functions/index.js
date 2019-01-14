const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")
const admin = require("firebase-admin")
const mkdirp = require("mkdirp-promise")
const spawn = require("child-process-promise").spawn
const path = require("path")
const os = require("os")
const fs = require("fs")
const { Storage } = require("@google-cloud/storage")
const serviceAccount = require("./firebase-admin-key.json")

const JPEG_EXTENSION = ".jpg"
const S_THUMB_POSTFIX = "_THUMB_S"
const M_THUMB_POSTFIX = "_THUMB_M"
const L_THUMB_POSTFIX = "_THUMB_L"

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

const logDeleteError = (err, name) => {
	console.error(
		`there was a problem while deleting ${name} it might not have been deleted`,
		err
	)
}

const logDeleteTime = (startTime, name) => {
	console.log(`Deleted ${name} in ${Date.now() - startTime}ms`)
}

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
				logDeleteTime(t, name)
				successCount++
			} catch (err) {
				logDeleteError(err, name)
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

// On image upload create convert image to JPEG and create thumbnails
// to save on bandwith and improve performance
exports.imageToJPG = functions.storage.object().onFinalize((object) => {
	// Creates a client
	const storage = new Storage()

	const filePath = object.name
	const baseFileName = path.basename(filePath, path.extname(filePath))
	const fileDir = path.dirname(filePath)
	const tempLocalFile = path.join(os.tmpdir(), filePath)
	const tempLocalDir = path.dirname(tempLocalFile)
	// To enable Client-side caching you can set the Cache-Control headers here.
	const metadata = {
		"Cache-Control": "public,max-age=3600"
	}

	// Temp JPEG
	const JPEGFilePath = path.normalize(
		path.format({ dir: fileDir, name: baseFileName, ext: JPEG_EXTENSION })
	)
	const tempLocalJPEGFile = path.join(os.tmpdir(), JPEGFilePath)

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
		console.log("This is not an image.")
		return null
	}

	// // Exit if the image is already a JPEG.
	// if (object.contentType.startsWith("image/jpeg")) {
	// 	console.log("Already a JPEG.")
	// 	return null
	// }

	// Get the reference to the image's bucket
	const bucket = storage.bucket(object.bucket)
	console.log("object bucket", object.bucket)
	console.log("bucket", bucket)
	console.log("filepath", filePath)

	// Create the temp directory where the storage file will be downloaded.
	return mkdirp(tempLocalDir)
		.then(() => {
			// Download file from bucket.
			return bucket.file(filePath).download({ destination: tempLocalFile })
		})
		.then(() => {
			console.log("The file has been downloaded to", tempLocalFile)
			// Skip if the image is already a JPEG.
			if (object.contentType.startsWith("image/jpeg")) {
				console.log("Already a JPEG.")
				return null
			}
			// Convert the image to JPEG using ImageMagick.
			return spawn("convert", [tempLocalFile, tempLocalJPEGFile])
		})
		.then(() => {
			console.log("JPEG image created at", tempLocalJPEGFile)
			// Skip if the image is already a JPEG.
			if (object.contentType.startsWith("image/jpeg")) {
				console.log("Already a JPEG.")
				return null
			}
			// Removing the original file
			return bucket.file(filePath).delete()
		})
		.then(() => {
			console.log("Old image removed from", filePath)
			// Uploading the JPEG image.
			return bucket.upload(tempLocalJPEGFile, {
				destination: filePath,
				metadata: metadata
			})
		})
		.then(() => {
			console.log("JPEG image uploaded to Storage at", filePath)
			// Generate a small thumbnail using ImageMagick.
			return spawn(
				"convert",
				[tempLocalJPEGFile, "-thumbnail", `100x100`, tempLocalThumbSFile],
				{ capture: ["stdout", "stderr"] }
			)
		})
		.then(() => {
			console.log("Small thumbnail generated at", thumbSPath)
			// Uploading the small thumbnail.
			return bucket.upload(tempLocalThumbSFile, {
				destination: thumbSPath,
				metadata: metadata
			})
		})
		.then(() => {
			// Generate a medium thumbnail using ImageMagick.
			return spawn(
				"convert",
				[tempLocalJPEGFile, "-thumbnail", `250x250`, tempLocalThumbMFile],
				{ capture: ["stdout", "stderr"] }
			)
		})
		.then(() => {
			console.log("Medium thumbnail generated at", thumbMPath)
			// Uploading the medium thumbnail.
			return bucket.upload(tempLocalThumbMFile, {
				destination: thumbMPath,
				metadata: metadata
			})
		})
		.then(() => {
			// Generate a large thumbnail using ImageMagick.
			return spawn(
				"convert",
				[tempLocalJPEGFile, "-thumbnail", `600x600`, tempLocalThumbLFile],
				{ capture: ["stdout", "stderr"] }
			)
		})
		.then(() => {
			console.log("Large thumbnail generated at", thumbLPath)
			// Uploading the large thumbnail.
			return bucket.upload(tempLocalThumbLFile, {
				destination: thumbLPath,
				metadata: metadata
			})
		})

		.then(() => {
			// Once the image has been converted delete the local files to free up disk space.
			fs.unlinkSync(tempLocalJPEGFile)
			fs.unlinkSync(tempLocalFile)
			fs.unlinkSync(tempLocalThumbSFile)
			fs.unlinkSync(tempLocalThumbLFile)
			return
		})
})
