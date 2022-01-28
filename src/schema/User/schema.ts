import {  removeDuplicates,  } from "../helpers"
import { createModel } from "../createModel"
import {KeyType, ModelledFirestoreCollectionNames, Schema} from "../types"

import {
  User,
  UserCalculated,
  UserCreateInputData,
  UserEditable,
  UserReadonly,
} from "./types"

const userSchema: Schema<
  User,
  UserReadonly,
  UserEditable,
  UserCalculated,
  UserCreateInputData
> = {
  collectionName: ModelledFirestoreCollectionNames.users,
  schema: {
    userSince: KeyType.READONLY,
    id: KeyType.READONLY,
    importedFrom: KeyType.READONLY,

    name: KeyType.EDITABLE,
    email: KeyType.EDITABLE,
    profilePictureURLs: KeyType.EDITABLE,
    city: KeyType.EDITABLE,
    phone: KeyType.EDITABLE,
    info: KeyType.EDITABLE,
    messengerLink: KeyType.EDITABLE,
    profilePictureRef: KeyType.EDITABLE,
    roles: KeyType.EDITABLE,
    feedback: KeyType.EDITABLE,
    badges: KeyType.EDITABLE,
    preferences: KeyType.EDITABLE,
    savedItems: KeyType.EDITABLE,
    savedFilters: KeyType.EDITABLE,
    savedDrops: KeyType.EDITABLE,
    followedUsers: KeyType.EDITABLE,
    followedDrops: KeyType.EDITABLE,
    // items: string[] // TODO: check
  },
  createEditable: (input): UserEditable => ({
    name: input.name,
    email: input.email,
    profilePictureURLs: input.profilePictureURLs,

    city: null,
    phone: null,
    info: null,
    messengerLink: null,
    profilePictureRef: null,
    roles: [],
    feedback: [],
    badges: [],
    preferences: [],
    savedItems: [],
    savedFilters: [],
    savedDrops: [],
    followedUsers: [],
    followedDrops: [],
    // items: [] // TODO: check
  }),
  createReadonly: (input): UserReadonly => ({
    userSince: Date.now(),
    id: input.id,
    importedFrom: input.importedFrom,
  }),
  formatEditable: (editable) => {
    editable.roles = removeDuplicates(editable.roles)
    editable.feedback = removeDuplicates(editable.feedback)
    editable.badges = removeDuplicates(editable.badges)
    editable.savedItems = removeDuplicates(editable.savedItems)
    editable.savedFilters = removeDuplicates(editable.savedFilters)
    editable.savedDrops = removeDuplicates(editable.savedDrops)
    editable.followedUsers = removeDuplicates(editable.followedUsers)
    editable.followedDrops = removeDuplicates(editable.followedDrops)
  },
  createCalculated: (): UserCalculated => ({}),
}

export const userModel = createModel(userSchema)
