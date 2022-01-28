import { nanoid } from "nanoid"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/compat/firestore"
import "firebase/compat/messaging"
import "firebase/compat/functions"
import isFunction from "lodash/isFunction"

import { CONST } from "../../constants"
import { areNotificationsSupported, notIn } from "../../utils"
import {
  Deal,
  DealCreateInputData,
  dealModel,
  DealUpdateInputData,
  Drop,
  DropCreateInputData,
  dropModel,
  DropUpdateInputData,
  FirestoreCollectionDataTypes,
  Item,
  ItemCreateInputData,
  itemModel,
  ItemUpdateInputData,
  Model,
  ModelledFirestoreCollectionNames,
  Post,
  PostCreateInputData,
  postModel,
  PostUpdateInputData,
  User,
  UserCreateInputData,
  userModel,
  UserUpdateInputData,
} from "../../schema"
import { MergedUser, ThumbnailSizePostfix } from "../../types"

import {
  batchGetAttachmentRefFromCustomFile,
  getAttachmentRefFromCustomFile,
} from "../FileHandler"

import config from "./config"

import FirestoreDataConverter = firebase.firestore.FirestoreDataConverter
import DocumentReference = firebase.firestore.DocumentReference

const { S_THUMB_POSTFIX, M_THUMB_POSTFIX, L_THUMB_POSTFIX } = CONST

type UpdateFirestoreDocumentParams<DataType, EditInputData> = [
  string | DataType,
  EditInputData | ((prevData: DataType) => EditInputData)
]

const createTypedConverter = <T>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap) => snap.data() as T,
})

// noinspection SpellCheckingInspection
const publicVapidKey =
  process.env.NODE_ENV === "development"
    ? "BJgcHagtqijyfb4WcD8UhMUtWEElieyaGrNFz7Az01aEYgqcKaR4CKpzzXtxXb_9rnGMLxkkhdTSSyLNvvzClSU"
    : "BLWCrtJ5HTzxbZF88ibi1LqlV_WEU7jbjZ7h1wtHXPcQ1NfiQsFhVyqY5YzI4yRDie6aG_V1DJUny_DwjC1JOJA"

class Firebase {
  functions: firebase.functions.Functions
  fn: firebase.functions.Functions["httpsCallable"]
  emailAuthProvider: firebase.auth.EmailAuthProvider
  auth: firebase.auth.Auth
  googleProvider: firebase.auth.GoogleAuthProvider
  facebookProvider: firebase.auth.FacebookAuthProvider
  signInMethods: {
    google: string
    facebook: string
    email: string
  }
  db: firebase.firestore.Firestore
  messaging: firebase.messaging.Messaging
  storage: firebase.storage.Storage
  storageRef: firebase.storage.Reference
  FieldValue = firebase.firestore.FieldValue

  constructor() {
    firebase.initializeApp(config)

    // Cloud Functions
    this.functions = firebase.functions()
    this.fn = this.functions.httpsCallable

    // Auth
    /* emailAuthProvider needs to be on top or else it will be overridden */
    this.emailAuthProvider = new firebase.auth.EmailAuthProvider()
    this.auth = firebase.auth()
    this.auth.languageCode = "pl"

    this.googleProvider = new firebase.auth.GoogleAuthProvider()
    this.facebookProvider = new firebase.auth.FacebookAuthProvider()

    this.signInMethods = {
      google: firebase.auth.GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      facebook: firebase.auth.FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
      email: firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    }

    // Storage
    this.storage = firebase.storage()
    this.storageRef = this.storage.ref()

    // Firestore (Database)
    this.db = firebase.firestore()

    // FieldValue - used for things like arrayUnion, increment etc.
    this.FieldValue = firebase.firestore.FieldValue

    // Messaging
    if (areNotificationsSupported()) {
      // TODO: better handling for getting permissions and handling different possible scenarios
      this.messaging = firebase.messaging()
      this.messaging
        .getToken({ vapidKey: publicVapidKey })
        .then((token) => this.sendNotificationTokenToDb(token))
        .catch((e) => {
          console.error("error", e)
        })

      this.messaging.onMessage(function (payload) {
        console.log("Message received. ", payload)
        // ...
      })
    }
  }

  // Internal Helpers =================================================================================================

  __getDocumentRefById = <T extends ModelledFirestoreCollectionNames>(
    collectionName: T,
    id: string
  ): DocumentReference<FirestoreCollectionDataTypes[T]> => {
    const firestoreRef = {
      users: this.user(id),
      items: this.item(id),
      deals: this.deal(id),
      drops: this.drop(id),
      posts: this.post(id),
    }[collectionName] as DocumentReference<FirestoreCollectionDataTypes[T]>

    return firestoreRef
  }

  __getDataById = async <T extends ModelledFirestoreCollectionNames>(
    collectionName: T,
    id: string
  ): Promise<FirestoreCollectionDataTypes[T]> => {
    const firestoreRef = this.__getDocumentRefById(collectionName, id)

    const snap = await firestoreRef.get()
    const data = snap.data()
    if (!data) {
      throw new Error("Data not found!") // TODO: maybe simply return null or undefined (or at least a custom error)
    }
    return data
  }

  /**
   * Update a firestore document using previous and new data
   * @param model database model containing collectionName and formatting functions
   * @param idOrPrevData id string or data object
   * @param inputDataOrCreator object containing a partial data object with values to be updated, or a callback receiving previous data that creates this object
   */
  __updateFirestoreDocument = async <
    DataType extends FirestoreCollectionDataTypes[ModelledFirestoreCollectionNames],
    CreateInputType,
    EditInputType
  >(
    model: Model<DataType, CreateInputType, EditInputType>,
    idOrPrevData: string | DataType,
    inputDataOrCreator: EditInputType | ((prevData: DataType) => EditInputType)
  ) => {
    const collectionName = model.collectionName

    // Get previous data if idOrPrevData argument was an id string, otherwise use the provided data
    const prevData =
      typeof idOrPrevData === "string"
        ? ((await this.__getDataById(collectionName, idOrPrevData)) as DataType)
        : idOrPrevData

    if (!prevData) {
      console.error("Can't update document, previous doc data not found")
      return
    }

    const id = typeof idOrPrevData === "string" ? idOrPrevData : prevData.id

    // Create merge data from prev data and callback
    const mergeDataObj = isFunction(inputDataOrCreator)
      ? inputDataOrCreator(prevData)
      : inputDataOrCreator

    // Format the values for db
    const formattedData = model.formatForEdit(prevData, mergeDataObj)

    console.log("FORMATTED_DATA:", formattedData)

    // Update drop
    await this.__getDocumentRefById(collectionName, id).set(formattedData) // TODO: consider not awaiting this as the promise won't resolve when offline
  }

  /**
   * Create a firestore document using input data (id is taken from output of formatter function
   * @param model database model containing collectionName and formatting functions
   * @param inputData input data object to initialize the object
   * @private
   */
  __createFirestoreDocument = async <
    DataType extends FirestoreCollectionDataTypes[ModelledFirestoreCollectionNames],
    CreateInputType,
    EditInputType
  >(
    model: Model<DataType, CreateInputType, EditInputType>,
    inputData: CreateInputType
  ) => {
    const collectionName = model.collectionName

    // Format the values for db
    const formattedData = model.formatForCreate(inputData)

    const id = formattedData.id

    console.log("FORMATTED_DATA:", formattedData)

    // Update drop
    await this.__getDocumentRefById(collectionName, id).set(formattedData) // TODO: consider not awaiting this as the promise won't resolve when offline
  }

  // Messaging API ====================================================================================================

  sendNotificationTokenToDb = async (token: string) => {
    const currentUser = this.currentUser()

    if (!currentUser) {
      console.error(
        "Can't send notification token to db, currentUser is missing!"
      )
      return
    }

    const tokenRef = currentUser.collection("notificationTokens").doc(token)

    const tokenDoc = await tokenRef.get()

    if (!tokenDoc.exists) {
      return tokenRef.set({ createdAt: Date.now() })
    }
  }

  // Auth API =========================================================================================================

  signUpWithEmail = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmail = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password)

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  signOut = () => this.auth.signOut()

  resetPassword = (email: string) => this.auth.sendPasswordResetEmail(email)

  updatePassword = (password: string) =>
    this.authUser().updatePassword(password)

  updateEmail = (email: string) => this.authUser().updateEmail(email)

  sendEmailVerification = () => this.authUser().sendEmailVerification()

  deleteUser = () => this.authUser().delete()

  authUser = () => {
    const authUser = this.auth.currentUser
    if (!authUser) {
      throw new Error("no authUser")
    }
    return authUser
  }

  // User API =========================================================================================================

  users = () =>
    this.db.collection("users").withConverter(createTypedConverter<User>())
  user = (id: string) => this.users().doc(id)
  getUserById = (id: string) =>
    this.__getDataById(ModelledFirestoreCollectionNames.users, id)
  // TODO: merge with getUserById
  getUserData = async (
    userId: string
  ): Promise<
    | { user: firebase.firestore.DocumentData | undefined; error?: undefined } // TODO: better user type
    | { user?: undefined; error: string }
  > => {
    // Look for the document with correct id
    const userSnap = await this.user(userId).get()
    // If the user isn't found throw an error
    if (!userSnap.exists) {
      return { error: "Nie znaleziono użytkownika" }
    } else {
      // Get user data
      return { user: userSnap.data() }
    }
  }
  currentUser = () => {
    const authUser = this.authUser()
    return authUser ? this.user(authUser.uid) : null
  }
  createUser = async (inputData: UserCreateInputData) =>
    this.__createFirestoreDocument(userModel, inputData)
  updateUser = async (
    ...args: UpdateFirestoreDocumentParams<User, UserUpdateInputData>
  ) =>
    this.__updateFirestoreDocument<
      User,
      UserCreateInputData,
      UserUpdateInputData
    >(userModel, ...args)

  // Item API =========================================================================================================

  items = () =>
    this.db.collection("items").withConverter(createTypedConverter<Item>())
  item = (id: string) => this.items().doc(id)
  getItemById = (id: string) =>
    this.__getDataById(ModelledFirestoreCollectionNames.items, id)
  // TODO: merge with getItemById
  getItemData = async (id: string) => {
    const itemDoc = await this.item(id).get()
    if (!itemDoc.exists) {
      console.warn(`Item with id ${id} wasn't found`)
      return null
    } else {
      return itemDoc.data()
    }
  }
  createItem = async (inputData: ItemCreateInputData) =>
    this.__createFirestoreDocument(itemModel, inputData)
  updateItem = async (
    ...args: UpdateFirestoreDocumentParams<Item, ItemUpdateInputData>
  ) =>
    this.__updateFirestoreDocument<
      Item,
      ItemCreateInputData,
      ItemUpdateInputData
    >(itemModel, ...args)

  // Posts API ========================================================================================================

  posts = () =>
    this.db.collection("posts").withConverter(createTypedConverter<Post>())
  post = (id: string) => this.posts().doc(id)
  getPostById = (id: string) =>
    this.__getDataById(ModelledFirestoreCollectionNames.posts, id)
  createPost = async (inputData: PostCreateInputData) =>
    this.__createFirestoreDocument(postModel, inputData)
  updatePost = async (
    ...args: UpdateFirestoreDocumentParams<Post, PostUpdateInputData>
  ) =>
    this.__updateFirestoreDocument<
      Post,
      PostCreateInputData,
      PostUpdateInputData
    >(postModel, ...args)

  // Drops API ========================================================================================================

  drops = () =>
    this.db.collection("drops").withConverter(createTypedConverter<Drop>())
  drop = (id: string) => this.drops().doc(id)
  getDropById = (id: string) =>
    this.__getDataById(ModelledFirestoreCollectionNames.drops, id)
  createDrop = async (inputData: DropCreateInputData) =>
    this.__createFirestoreDocument(dropModel, inputData)
  updateDrop = async (
    ...args: UpdateFirestoreDocumentParams<Drop, DropUpdateInputData>
  ) =>
    this.__updateFirestoreDocument<
      Drop,
      DropCreateInputData,
      DropUpdateInputData
    >(dropModel, ...args)

  // Deals API ========================================================================================================

  deals = () =>
    this.db.collection("deals").withConverter(createTypedConverter<Deal>())
  deal = (id: string) => this.deals().doc(id)
  getDealById = (id: string) =>
    this.__getDataById(ModelledFirestoreCollectionNames.deals, id)
  createDeal = async (inputData: DealCreateInputData) =>
    this.__createFirestoreDocument(dealModel, inputData)
  updateDeal = async (
    ...args: UpdateFirestoreDocumentParams<Deal, DealUpdateInputData>
  ) =>
    this.__updateFirestoreDocument<
      Deal,
      DealCreateInputData,
      DealUpdateInputData
    >(dealModel, ...args)

  // Designers API ====================================================================================================

  designers = () => this.db.collection("designers")
  designer = (id: string) => this.designers().doc(id)
  // getDesignerById = (id: string) => this.__getDataById("designers", id)

  // Authors API ======================================================================================================

  // author = (id: string) => this.db.collection("authors").doc(id)
  // authors = () => this.db.collection("authors")
  // getAuthorById = (id: string) => this.__getDataById("authors", id)

  // FollowedDrops API ================================================================================================

  followedDrops = () => this.db.collection("followedDrops")
  followedDrop = (id: string) => this.followedDrops().doc(id)

  // Rooms API ========================================================================================================

  rooms = () => this.db.collection("rooms")
  room = (id: string) => this.rooms().doc(id)

  // Storage API ======================================================================================================

  file = (ref: string) => this.storageRef.child(ref)

  uploadFile = async (
    bucket: string,
    file: Parameters<firebase.storage.Reference["put"]>[0]
  ) => {
    const name = nanoid()
    const ref = this.file(`${bucket}/${name}`)
    return ref.put(file)
  }

  // this method uses CustomFile class
  batchUploadFiles = async (
    uploadPath: string,
    files: Parameters<this["uploadFile"]>[1][]
  ) => {
    return Promise.all(
      files.map(async (file) => {
        const fileData = (file as any).data as any // TODO: properly handle these types
        const snapshot = await this.uploadFile(uploadPath, fileData)
        return snapshot.ref.fullPath // TODO: make return types of uploadFile and batchUploadFiles consistent
      })
    )
  }

  // curry the custom file related helpers with the firebase object
  getAttachmentRefFromCustomFile = getAttachmentRefFromCustomFile(this)

  batchGetAttachmentRefFromCustomFile =
    batchGetAttachmentRefFromCustomFile(this)

  removeFile = async (ref: string) => {
    return this.file(ref).delete()
  }

  /**
   * removes all files (original and thumbanails) for a given base storageRef
   * @param {string} storageRef storageRef of file to be deleted
   */
  removeAllImagesOfRef = async (storageRef: string) => {
    return await this.batchRemoveFiles([
      storageRef,
      storageRef + L_THUMB_POSTFIX,
      storageRef + M_THUMB_POSTFIX,
      storageRef + S_THUMB_POSTFIX,
    ])
  }

  batchRemoveAllImagesOfRefs = async (storageRefs: string[]) => {
    return Promise.all(storageRefs.map((ref) => this.removeAllImagesOfRef(ref)))
  }

  batchRemoveFiles = async (refs: string[]) => {
    // TODO: consider moving all batch methods to Promise.allSettled and adding handling for errors in promises
    return Promise.all(refs.map((ref) => this.removeFile(ref)))
  }

  getImageURL = async (ref: string, size?: ThumbnailSizePostfix) => {
    if (size === "S") {
      ref += S_THUMB_POSTFIX
    } else if (size === "M") {
      ref += M_THUMB_POSTFIX
    } else if (size === "L") {
      ref += L_THUMB_POSTFIX
    }
    return this.file(ref).getDownloadURL()
  }

  batchGetImageURLs = async (refs: string[], size?: ThumbnailSizePostfix) => {
    return refs
      ? Promise.all(refs.map((ref) => this.getImageURL(ref, size)))
      : []
  }

  deleteRemovedImagesFromStorage = async (
    oldStorageRefs: string[],
    newStorageRefs: string[]
  ) => {
    // Old refs no longer present in new refs are marked for deletion
    let refsToDelete = oldStorageRefs.filter(notIn(newStorageRefs))
    // Remove files associated with the marked refs
    await this.batchRemoveAllImagesOfRefs(refsToDelete)
  }

  // Merge Auth and DB Users ===========================================================================================

  onAuthUserListener = (
    next: (user: MergedUser) => void,
    fallback: () => void
  ) =>
    this.auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        return fallback()
      }
      // get current user's info from database
      const dbUser = await this.getUserById(authUser.uid)

      // merge auth and db user
      const mergedUser: MergedUser = {
        uid: authUser.uid,
        emailVerified: authUser.emailVerified,
        ...dbUser,
      }

      // TODO: disable this request for permission (and replace with a better one)
      if (areNotificationsSupported()) {
        if (Notification.permission !== "granted") {
          // TODO: support Safari's old callback API https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              this.messaging.getToken().then((token) => {
                this.sendNotificationTokenToDb(token)
              })
            }
          })
        }
      }

      next(mergedUser)
    })
}

export default Firebase
