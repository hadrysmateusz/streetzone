const functions = require("firebase-functions")

// dotenv is not supported by firebase cloud functions (as of v3.0.1)

const indices = require("./algoliaIndices")
const { algoliaAdd, algoliaUpdate, algoliaDelete } = require("./algoliaSync")
const removeItemsOfUser = require("./removeItemsOfUser")
const removeSubcollectionsOfUser = require("./removeSubcollectionsOfUser")
const removeUserDataFromDb = require("./removeUserDataFromDb")
const removeImagesOfItem = require("./removeImagesOfItem")
const processImage = require("./processImage")
const onChatMessageSent = require("./onChatMessageSent")
const promotingApp = require("./itemPromotingApp")
const promoteItem = require("./promoteItem")
const dropNotification = require("./dropNotification")
const confirmDesignerAdded = require("./confirmDesignerAdded")

// items

exports.onItemCreated = functions.firestore
	.document(`items/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, indices.items)
	})

exports.onItemUpdated = functions.firestore
	.document(`items/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, indices.items)
	})

exports.onItemDeleted = functions.firestore
	.document(`items/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, indices.items)
	})

// posts

exports.onBlogPostCreated = functions.firestore
	.document(`posts/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, indices.posts)
	})

exports.onBlogPostUpdated = functions.firestore
	.document(`posts/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, indices.posts)
	})

exports.onBlogPostDeleted = functions.firestore
	.document(`posts/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, indices.posts)
	})

// deals

exports.onDealCreated = functions.firestore
	.document(`deals/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, indices.deals)
	})

exports.onDealUpdated = functions.firestore
	.document(`deals/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, indices.deals)
	})

exports.onDealDeleted = functions.firestore
	.document(`deals/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, indices.deals)
	})

// drops

exports.onDropCreated = functions.firestore
	.document(`drops/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, indices.drops)
	})

exports.onDropUpdated = functions.firestore
	.document(`drops/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, indices.drops)
	})

exports.onDropDeleted = functions.firestore
	.document(`drops/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, indices.drops)
	})

// designers

exports.onDesignerCreated = functions.firestore
	.document(`designers/{id}`)
	.onCreate((snap, context) => {
		algoliaAdd(snap, context, indices.designers)
	})

exports.onDesignerUpdated = functions.firestore
	.document(`designers/{id}`)
	.onUpdate((snap, context) => {
		algoliaUpdate(snap, context, indices.designers)
	})

exports.onDesignerDeleted = functions.firestore
	.document(`designers/{id}`)
	.onDelete((snap, context) => {
		algoliaDelete(snap, context, indices.designers)
	})

// When an item is removed from db remove its images from storage
exports.removeItemImages = functions.firestore
	.document(`items/{id}`)
	.onDelete(removeImagesOfItem)

// When a user is deleted from db their items are removed from the db
exports.removeItemsOfUser = functions.firestore
	.document(`users/{userId}`)
	.onDelete(removeItemsOfUser)

// When a user is deleted from db their subcollections are removed from the db
exports.removeSubcollectionsOfUser = functions.firestore
	.document(`users/{userId}`)
	.onDelete(removeSubcollectionsOfUser)

// When an authUser is deleted the corresponding user is removed from db
exports.userDbCleanup = functions.auth.user().onDelete(removeUserDataFromDb)

// On image upload convert image to JPEG and create thumbnails
// to save on bandwith and improve performance
exports.processImage = functions
	.runWith({ memory: "512MB" })
	.storage.object()
	.onFinalize(processImage)

// Send push notifications
exports.onChatMessageSent = functions.firestore
	.document(`rooms/{roomId}/messages/{messageId}`)
	.onCreate(onChatMessageSent)

// Expose Express API as a single Cloud Function:
exports.promoteNotification = functions.https.onRequest(promotingApp)

// Pay for promoting
exports.promote = functions.https.onCall(promoteItem)

// This schedule should run the function at 9am every day
exports.dropNotification = functions.pubsub
	.schedule("0 9 * * *")
	.timeZone("Poland")
	.onRun(dropNotification)

// send notification to user who requested the designer to be added
exports.confirmDesignerAdded = functions.https.onCall(confirmDesignerAdded)
