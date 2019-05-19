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

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)
adminConfig.credential = admin.credential.cert(serviceAccount)
admin.initializeApp(adminConfig)

const isProd = adminConfig.projectId.endsWith("-prod")

// ===============================================================================
// !!! REMEMBER TO ALSO CHANGE IN "SRC/CONSTANTS/CONST.JS" !!!
const ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX = isProd ? "prod_items" : "dev_items"
const ITEMS_MARKETPLACE_PRICE_ASC_ALGOLIA_INDEX = isProd
	? "prod_items_price_asc"
	: "dev_items_price_asc"
const ITEMS_CUSTOM_ALGOLIA_INDEX = isProd ? "prod_custom" : "dev_custom"
const BLOG_POST_ALGOLIA_INDEX = isProd ? "prod_posts" : "dev_posts"
const BLOG_DROP_ALGOLIA_INDEX = isProd ? "prod_drops" : "dev_drops"
const BLOG_DROP_NEWEST_ALGOLIA_INDEX = isProd ? "prod_drops_newest" : "dev_drops_newest"
const DESIGNERS_ALGOLIA_INDEX = isProd ? "prod_designers" : "dev_designers"

// ===============================================================================

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

const bucket = admin.storage().bucket()

// ------------------------------------
// ---- Algolia Index Sync Helpers ----
// ------------------------------------

const algoliaAdd = (snap, context, indexName) => {
	// Get the item document
	const item = snap.data()

	// Add an 'objectID' field which Algolia requires
	item.objectID = context.params.id

	// Write to the algolia index
	const index = client.initIndex(indexName)
	return index.saveObject(item)
}

const algoliaUpdate = (snap, context, indexName) => {
	// Get the item document
	const item = snap.after.data()

	// Add an 'objectID' field which Algolia requires
	item.objectID = context.params.id

	// Write to the algolia index
	const index = client.initIndex(indexName)
	return index.saveObject(item)
}

const algoliaDelete = (snap, context, indexName) => {
	// Get the object id
	const objectID = context.params.id

	// Remove item with the corresponding id
	const index = client.initIndex(indexName)
	return index.deleteObject(objectID)
}

// ------------------------------------
// ------------ Item Events -----------
// ------------------------------------

exports.onItemCreated = functions.firestore
	.document(`items/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX)
	})

exports.onItemUpdated = functions.firestore
	.document(`items/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX)
	})

exports.onItemDeleted = functions.firestore
	.document(`items/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX)
	})

// ------------------------------------
// --------- Blog Post Events ---------
// ------------------------------------

exports.onBlogPostCreated = functions.firestore
	.document(`posts/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, BLOG_POST_ALGOLIA_INDEX)
	})

exports.onBlogPostUpdated = functions.firestore
	.document(`posts/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, BLOG_POST_ALGOLIA_INDEX)
	})

exports.onBlogPostDeleted = functions.firestore
	.document(`posts/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, BLOG_POST_ALGOLIA_INDEX)
	})

// ------------------------------------
// --------- Drops Events ---------
// ------------------------------------

exports.onDropCreated = functions.firestore
	.document(`drops/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, BLOG_DROP_ALGOLIA_INDEX)
	})

exports.onDropUpdated = functions.firestore
	.document(`drops/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, BLOG_DROP_ALGOLIA_INDEX)
	})

exports.onDropDeleted = functions.firestore
	.document(`drops/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, BLOG_DROP_ALGOLIA_INDEX)
	})

// ------------------------------------
// ------- Designers List Events ------
// ------------------------------------

exports.onDesignerCreated = functions.firestore
	.document(`designers/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, DESIGNERS_ALGOLIA_INDEX)
	})

exports.onDesignerUpdated = functions.firestore
	.document(`designers/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, DESIGNERS_ALGOLIA_INDEX)
	})

exports.onDesignerDeleted = functions.firestore
	.document(`designers/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, DESIGNERS_ALGOLIA_INDEX)
	})

// ------------------------------------
// ---------- Items handling ----------
// ------------------------------------

// When an item is removed from db remove its images from storage
exports.removeItemImages = functions.firestore
	.document(`items/{id}`)
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

// When an item is removed from db remove it from it's owner's items list
exports.removeItemFromUser = functions.firestore
	.document(`items/{id}`)
	.onDelete(async (snap, context) => {
		const data = snap.data()
		const userId = data.userId
		const id = context.params.id
		const db = admin.firestore()

		// get owner's data
		const userSnap = await db
			.collection("users")
			.doc(userId)
			.get()
		const userData = userSnap.data()
		// filter out the removed item
		const newItems = userData.items.filter((item) => item.id !== id)
		// update the db with the new items list
		const res = await db
			.collection("users")
			.doc(userId)
			.update({ items: newItems })

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

const generateThumbnail = ({ size, mode }, pathFrom, pathTo) => {
	if (mode === "cover") {
		return spawn(
			"convert",
			[pathFrom, "-thumbnail", size + "^", "-gravity", "center", "-extent", size, pathTo],
			{
				capture: ["stdout", "stderr"]
			}
		)
	} else if (mode === "contain") {
		return spawn("convert", [pathFrom, "-thumbnail", size, pathTo], {
			capture: ["stdout", "stderr"]
		})
	}
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
exports.processImage = functions
	.runWith({ memory: "512MB" })
	.storage.object()
	.onFinalize(async (file) => {
		if (file.name.includes("attachments/")) {
			console.log("Processing an attachment...")
			return await processImage(file, [
				{ size: "110x110", mode: "cover" },
				{ size: "260x335", mode: "cover" },
				{ size: "770x640", mode: "contain" }
			])
		} else if (file.name.includes("profile-pictures/")) {
			console.log("Processing a profile picture...")
			const urls = await processImage(file, [
				{ size: "60x60", mode: "cover" },
				{ size: "130x130", mode: "cover" },
				{ size: "230x230", mode: "cover" }
			])
			if (urls) {
				const userId = file.name.split("/")[1]
				await writeUrlsToDb(userId, urls)
			}
			return
		}
	})

// Send push notifications
exports.onChatMessageSent = functions.firestore
	.document(`rooms/{roomId}/messages/{messageId}`)
	.onCreate(async (snap, context) => {
		const roomId = context.params.roomId

		const db = admin.firestore()
		const messageData = snap.data()
		const senderId = messageData.author

		const roomSnap = await db.doc(`rooms/${roomId}`).get()
		const roomData = roomSnap.data()
		const userA = roomData.userA
		const userB = roomData.userB
		const recipientId = userA !== senderId ? userA : userB

		console.log("message data", messageData)
		console.log("room data", roomData)
		console.log("senderId", senderId)
		console.log("recipientId", recipientId)

		// Get the list of device notification tokens.
		const getDeviceTokensPromise = db
			.doc(`users/${recipientId}`)
			.collection("notificationTokens")
			.get()

		// Get the follower profile.
		const getSenderData = db.doc(`users/${senderId}`).get()

		const results = await Promise.all([getDeviceTokensPromise, getSenderData])
		const tokensSnapshot = results[0]
		const senderSnapshot = results[1]

		// Check if there are any device tokens.
		if (tokensSnapshot.empty) {
			return console.log("There are no notification tokens to send to.")
		} else {
			console.log("There are", tokensSnapshot.size, "tokens to send notifications to.")
		}

		const tokens = tokensSnapshot.docs.map((doc) => doc.id)
		const senderData = senderSnapshot.data()

		console.log("Fetched sender profile", senderData)

		// Notification details.
		const payload = {
			notification: {
				title: `Wiadomość od ${senderData.name}`,
				body: ("" + messageData.message).trim()
			}
		}

		const userIcon = senderData.profilePictureURLs
			? senderData.profilePictureURLs[0]
			: null
		if (userIcon) {
			payload.notification.icon = userIcon
		}

		console.log("payload", payload)

		// Send notifications to all tokens.
		const response = await admin.messaging().sendToDevice(tokens, payload)
		// For each message check if there was an error.
		const tokensToRemove = []
		response.results.forEach((result, index) => {
			const error = result.error
			if (error) {
				console.error("Failure sending notification to", tokens[index], error)
				// Cleanup the tokens who are not registered anymore.
				if (
					error.code === "messaging/invalid-registration-token" ||
					error.code === "messaging/registration-token-not-registered"
				) {
					console.log("docs:", tokensSnapshot.docs)
					console.log("index:", index)
					console.log("token:", tokensSnapshot.docs[index])
					console.log("tokenRef:", tokensSnapshot.docs[index].ref)
					tokensToRemove.push(tokensSnapshot.docs[index].ref.delete())
				}
			}
		})
		return Promise.all(tokensToRemove)
	})
