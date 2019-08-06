const admin = require("firebase-admin")

/* The FIREBASE_CONFIG environment variable is included automatically in 
Cloud Functions for Firebase functions that were deployed via the Firebase CLI */
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG)

// figure out if project is in production env based on adminConfig
const isProd = adminConfig.projectId.endsWith("-prod")

// import correct service account file based on env
const serviceAccount = require(isProd
	? "./firebase-admin-key-prod.json"
	: "./firebase-admin-key-dev.json")

// add admin credentials to adminConfig
adminConfig.credential = admin.credential.cert(serviceAccount)

// initialize firebase app
admin.initializeApp(adminConfig)

const storage = admin.storage()
const db = admin.firestore()
const messaging = admin.messaging()
const bucket = storage.bucket()

module.exports = {
	db,
	storage,
	bucket,
	isProd,
	messaging
}
