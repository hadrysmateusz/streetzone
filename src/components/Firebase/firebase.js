import uuidv1 from "uuid/v1"
import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

import { ITEM_SCHEMA } from "../../constants"

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

	currentUser = () => {
		return this.authUser() ? this.db.collection("users").doc(this.authUser().uid) : null
	}

	getUserData = async (userId) => {
		let res = {
			user: null,
			error: null
		}
		try {
			// Look for the document with correct id
			console.log("userId", userId)
			const userSnap = await this.user(userId).get()
			// If the user isn't found throw an error
			if (!userSnap.exists) throw new Error("Nie znaleziono użytkownika")
			// Get user data
			const userData = userSnap.data()
			res.user = userData
		} catch (error) {
			res.error = error
		} finally {
			return res
		}
	}

	getUserItems = async (user) => {
		let res = {
			availableItems: [],
			soldItems: [],
			error: null
		}

		try {
			// map user's itemIds to data fetched from firestore
			const items = await Promise.all(
				user.items.map((itemId) => this.getItemData(itemId))
			)

			// separate the results into available and sold
			for (let item of items) {
				if (item.status === ITEM_SCHEMA.status.available) {
					res.availableItems.push(item)
				} else if (item.status === ITEM_SCHEMA.status.sold) {
					res.soldItems.push(item)
				}
			}
		} catch (error) {
			res.error = error
		} finally {
			return res
		}
	}

	// Item API

	item = (id) => this.db.collection("items").doc(id)
	items = () => this.db.collection("items")

	getItemData = async (itemId) => {
		console.log("itemId", itemId)
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

	// Marge Auth and DB Users

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
