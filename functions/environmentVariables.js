const functions = require("firebase-functions")

exports.ALGOLIA_ID = functions.config().algolia.app_id
exports.ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key
exports.PAYU_CLIENT_ID = functions.config().payu.client_id
exports.PAYU_CLIENT_SECRET = functions.config().payu.client_secret
