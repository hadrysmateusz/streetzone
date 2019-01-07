import uuidv1 from "uuid/v1"
import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

import { NotFoundError } from "../../errors"

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
		/* emailAuthProvider needs to be on top or else it will be overriden */
		this.emailAuthProvider = app.auth.EmailAuthProvider
		this.auth = app.auth()
		this.auth.languageCode = "pl"

		this.googleProvider = new app.auth.GoogleAuthProvider()
		this.facebookProvider = new app.auth.FacebookAuthProvider()

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

	signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

	signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

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

	getItemData = async (itemId) => {
		const itemDoc = await this.item(itemId).get()
		if (!itemDoc.exists) {
			console.warn(`Item with id ${itemId} wasn't found`)
			return {}
		} else {
			return itemDoc.data()
		}
	}

	// Posts API

	post = (id) => this.db.collection("posts").doc(id)
	posts = () => this.db.collection("posts")

	// Storage API

	file = (ref) => this.storageRef.child(ref)

	uploadFile = async (bucket, file) => {
		const name = uuidv1()
		const ref = this.file(`${bucket}/${name}`)
		return ref.put(file)
	}

	removeFile = async (ref) => {
		return this.file(ref).delete()
	}

	batchRemoveFiles = async (refs) => {
		return Promise.all(refs.map((ref) => this.removeFile(ref)))
	}

	getImageURL = async (ref) => {
		return this.file(ref).getDownloadURL()
	}

	batchGetImageURLs = async (refs) => {
		return Promise.all(refs.map((ref) => this.getImageURL(ref)))
	}

	// Marge Auth and DB User API

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				// get current user's info from database
				const snapshot = await this.user(authUser.uid).get()
				const dbUser = snapshot.data()

				// merge auth and db user
				authUser = {
					uid: authUser.uid,
					emailVerified: authUser.emailVerified,
					...dbUser
				}

				next(authUser)
			} else {
				fallback()
			}
		})
}

export default Firebase
