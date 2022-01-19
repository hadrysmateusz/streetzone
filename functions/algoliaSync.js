const algoliasearch = require("algoliasearch")

const { ALGOLIA_ADMIN_KEY, ALGOLIA_ID } = require("./environmentVariables")

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

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

module.exports = {
	algoliaAdd,
	algoliaUpdate,
	algoliaDelete
}
