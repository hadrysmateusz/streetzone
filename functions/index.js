const functions = require("firebase-functions")
const algoliasearch = require("algoliasearch")

const ALGOLIA_ID = functions.config().algolia.app_id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key

const ALGOLIA_INDEX_NAME = "dev_items"
const FIRESTORE_DOCUMENT_NAME = "items"
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

exports.onItemCreated = functions.firestore
	.document(`${FIRESTORE_DOCUMENT_NAME}/{itemId}`)
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
	.document(`${FIRESTORE_DOCUMENT_NAME}/{itemId}`)
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
	.document(`${FIRESTORE_DOCUMENT_NAME}/{itemId}`)
	.onDelete((snap, context) => {
		// Get the object id
		const objectID = context.params.itemId

		// Remove item with the corresponding id
		const index = client.initIndex(ALGOLIA_INDEX_NAME)
		return index.deleteObject(objectID)
	})
