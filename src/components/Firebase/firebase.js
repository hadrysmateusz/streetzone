import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
}

class Firebase {
	constructor() {
		app.initializeApp(config)

		// Auth
		this.auth = app.auth()
		this.auth.languageCode = "pl"

		// Storage
		this.storage = app.storage()
		this.storageRef = this.storage.ref()

		// Firestore (Database)
		this.db = app.firestore()
		this.db.settings({
			timestampsInSnapshots: true
		})
	}

	// Auth API

	signUpWithEmail = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password)

	signInWithEmail = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password)

	signOut = () => this.auth.signOut()

	resetPassword = (email) => this.auth.sendPasswordResetEmail(email)

	updatePassword = (password) => this.auth.currentUser.updatePassword(password)

	authUser = () => this.auth.currentUser

	// User API

	users = () => this.db.collection("users")
	user = (uid) => this.db.collection("users").doc(uid)
	currentUser = () => this.db.collection("users").doc(this.auth.currentUser.uid)

	// Item API

	item = (id) => this.db.collection("items").doc(id)
	items = () => this.db.collection("items")

	getItem = async (itemId) => {
		try {
			// Get data from database
			let item = await this.item(itemId).get()
			item = { itemId: item.id, ...item.data() }

			return item
		} catch (e) {
			console.log(e)
		}
	}

	getImageURLs = async (attachments) => {
		try {
			// Map storage refs to image urls
			const imageURLs = await Promise.all(
				attachments.map(async (attachment, i) => {
					let ref = this.storageRef.child(attachment)
					return await ref.getDownloadURL()
				})
			)
			return imageURLs
		} catch (error) {
			console.log(error)
		}
	}
}

export default Firebase
