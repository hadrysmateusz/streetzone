const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")
const admin = require("firebase-admin")
const mkdirp = require("mkdirp-promise")
const spawn = require("child-process-promise").spawn
const path = require("path")
const os = require("os")
const fs = require("fs")
const { Storage } = require("@google-cloud/storage")

var serviceAccount = require("./firebase-admin-key.json")

const JPEG_EXTENSION = ".jpg"
const S_THUMB_POSTFIX = "_THUMB_S"
const L_THUMB_POSTFIX = "_THUMB_L"

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://streetwear-app.firebaseio.com"
})

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const ALGOLIA_INDEX_NAME = "dev_items"
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

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

// exports.removeItemImages = functions.firestore
// 	.document(`items/{itemId}`)
// 	.onDelete((snap, context) => {
// 		console.log("snap", snap)
// 		console.log("snap data", snap.data())
// 	})

exports.removeUserItems = functions.firestore
	.document(`users/{userId}`)
	.onDelete((snap, context) => {
		console.log("snap", snap)
		console.log("context", context)
		const db = admin.firestore()
		const data = snap.data()
		console.log("data", data)
		console.log("items", data.items)
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

exports.userDbCleanup = functions.auth.user().onDelete((user, ...rest) => {
	console.log("user", user)
	console.log("rest", ...rest)
	const userId = user.uid
	const db = admin.firestore()
	console.log("userSnap", db.collection("users").doc(userId))
	db.collection("users")
		.doc(userId)
		.delete()
		.then(() => {
			console.log(`user ${userId} was deleted`)
		})
		.catch((err) => console.log(err))
})

exports.onUserCreated = functions.auth.user().onCreate((...args) => {
	console.log("args", args)
})

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

	// Exit if the image is already a JPEG.
	if (object.contentType.startsWith("image/jpeg")) {
		console.log("Already a JPEG.")
		return null
	}

	// Get the reference to the image's bucket
	const bucket = storage.bucket(object.bucket)

	// Create the temp directory where the storage file will be downloaded.
	return mkdirp(tempLocalDir)
		.then(() => {
			// Download file from bucket.
			return bucket.file(filePath).download({ destination: tempLocalFile })
		})
		.then(() => {
			console.log("The file has been downloaded to", tempLocalFile)
			// Convert the image to JPEG using ImageMagick.
			return spawn("convert", [tempLocalFile, tempLocalJPEGFile])
		})
		.then(() => {
			console.log("JPEG image created at", tempLocalJPEGFile)
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
			// Generate a large thumbnail using ImageMagick.
			return spawn(
				"convert",
				[tempLocalJPEGFile, "-thumbnail", `250x250`, tempLocalThumbLFile],
				{ capture: ["stdout", "stderr"] }
			)
		})
		.then(() => {
			console.log("Large thumbnail generated at", thumbSPath)
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
