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

	// Posts API

	post = (id) => this.db.collection("posts").doc(id)
	posts = () => this.db.collection("posts")

	// Marge Auth and DB User API

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				// get current user's info from database
				const snapshot = await this.user(authUser.uid).get()
				const dbUser = snapshot.data()

				// default empty roles
				if (!dbUser.roles) {
					dbUser.roles = []
				}

				// merge auth and db user
				authUser = {
					uid: authUser.uid,
					email: authUser.email,
					...dbUser
				}

				next(authUser)
			} else {
				fallback()
			}
		})
}

export default Firebase
