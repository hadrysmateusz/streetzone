const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")
const admin = require("firebase-admin")

var serviceAccount = require("./firebase-admin-key.json")

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
