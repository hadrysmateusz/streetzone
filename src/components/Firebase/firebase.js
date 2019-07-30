import uuidv1 from "uuid/v1"
import app from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
import "firebase/messaging"
import "firebase/functions"
import { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } from "../../constants/const"
import areNotificationsSupported from "../../utils/areNotificationsSupported"

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
}

class Firebase {
	constructor() {
		app.initializeApp(config)

		// Cloud Functions
		this.functions = app.functions()
		this.fn = this.functions.httpsCallable

		// use the locally emulated functions in development
		// if (process.env.NODE_ENV === "development") {
		// 	this.functions._url = function(name) {
		// 		return `http://localhost:5001/streetwear-app/us-central1/${name}`
		// 	}
		// }

		// Auth
		/* emailAuthProvider needs to be on top or else it will be overriden */
		this.emailAuthProvider = app.auth.EmailAuthProvider
		this.auth = app.auth()
		this.auth.languageCode = "pl"

		this.googleProvider = new app.auth.GoogleAuthProvider()
		this.facebookProvider = new app.auth.FacebookAuthProvider()

		this.signInMethods = {
			google: app.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
			facebook: app.auth.GoogleAuthProvider.FACEBOOK_SIGN_IN_METHOD,
			email: app.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
		}

		// Storage
		this.storage = app.storage()
		this.storageRef = this.storage.ref()

		// Firestore (Database)
		this.db = app.firestore()

		// FieldValue - used for things like arrayUnion, increment etc.
		this.FieldValue = app.firestore.FieldValue

		// Messaging

		if (areNotificationsSupported()) {
			this.messaging = app.messaging()

			this.messaging.usePublicVapidKey(
				"BJgcHagtqijyfb4WcD8UhMUtWEElieyaGrNFz7Az01aEYgqcKaR4CKpzzXtxXb_9rnGMLxkkhdTSSyLNvvzClSU"
			)

			// TODO: disable this request for permission
			// this.messaging
			// 	.requestPermission()
			// 	.then(() => {
			// 		return this.messaging.getToken()
			// 	})
			// 	.then((token) => {
			// 		this.sendNotificationTokenToDb(token)
			// 	})
			// 	.catch((e) => {
			// 		console.log("error", e)
			// 	})

			this.messaging.onTokenRefresh(() => {
				console.log("token refreshed")
				this.messaging
					.getToken()
					.then((token) => {
						this.sendNotificationTokenToDb(token)
					})
					.catch((e) => {
						console.log("error", e)
					})
			})

			this.messaging.onMessage(function(payload) {
				console.log("Message received. ", payload)
				// ...
			})
		}
	}

	// Messaging API
	sendNotificationTokenToDb = (token) => {
		if (!this.authUser()) return

		const tokenRef = this.currentUser()
			.collection("notificationTokens")
			.doc(token)

		if (!tokenRef.exists) {
			return tokenRef.set({ createdAt: Date.now() })
		}
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

	updateEmail = (email) => this.auth.currentUser.updateEmail(email)

	sendEmailVerification = () => this.auth.currentUser.sendEmailVerification()

	deleteUser = () => this.auth.currentUser.delete()

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

	// Item API

	item = (id) => this.db.collection("items").doc(id)
	items = () => this.db.collection("items")

	getItemData = async (id) => {
		const itemDoc = await this.item(id).get()
		if (!itemDoc.exists) {
			console.warn(`Item with id ${id} wasn't found`)
			return null
		} else {
			return itemDoc.data()
		}
	}

	// Posts API

	post = (id) => this.db.collection("posts").doc(id)
	posts = () => this.db.collection("posts")

	// Drops API

	drop = (id) => this.db.collection("drops").doc(id)
	drops = () => this.db.collection("drops")

	// Deals API

	deal = (id) => this.db.collection("deals").doc(id)
	deals = () => this.db.collection("deals")

	// Designers API

	designer = (id) => this.db.collection("designers").doc(id)
	designers = () => this.db.collection("designers")

	// Storage API

	file = (ref) => this.storageRef.child(ref)

	uploadFile = async (bucket, file) => {
		const name = uuidv1()
		const ref = this.file(`${bucket}/${name}`)
		return ref.put(file)
	}

	// this method uses CustomFile class
	batchUploadFiles = async (uploadPath, files) => {
		return Promise.all(
			files.map(async (file) => {
				const snapshot = await this.uploadFile(uploadPath, file.data)
				return snapshot.ref.fullPath
			})
		)
	}

	removeFile = async (ref) => {
		return this.file(ref).delete()
	}

	/**
	 * removes all files (original and thumbanails) for a given base storageRef
	 * @param {string} storageRef storageRef of file to be deleted
	 */
	removeAllImagesOfRef = async (storageRef) => {
		await this.removeFile(storageRef)
		await this.removeFile(storageRef + L_THUMB_POSTFIX)
		await this.removeFile(storageRef + M_THUMB_POSTFIX)
		await this.removeFile(storageRef + S_THUMB_POSTFIX)
	}

	batchRemoveFiles = async (refs) => {
		return Promise.all(refs.map((ref) => this.removeFile(ref)))
	}

	getImageURL = async (ref, size) => {
		if (size === "S") {
			ref += S_THUMB_POSTFIX
		} else if (size === "M") {
			ref += M_THUMB_POSTFIX
		} else if (size === "L") {
			ref += L_THUMB_POSTFIX
		}
		return this.file(ref).getDownloadURL()
	}

	batchGetImageURLs = async (refs, size) => {
		return refs && Array.isArray(refs)
			? Promise.all(refs.map((ref) => this.getImageURL(ref, size)))
			: []
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

				// TODO: disable this request for permission (and replace with a better one)
				if (areNotificationsSupported()) {
					this.messaging
						.requestPermission()
						.then(() => {
							return this.messaging.getToken()
						})
						.then((token) => {
							this.sendNotificationTokenToDb(token)
						})
						.catch((e) => {
							console.log("error", e)
						})
				}

				next(authUser)
			} else {
				fallback()
			}
		})
}

export default Firebase
