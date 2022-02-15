// export interface UserFeedback {
//   author: string
//   comment: string
//   createdAt: number
//   id: string
//   rating: number
// }

export interface User {
  name: string
  email: string
  city: string | null
  phone: string | null
  info: any // TODO: check
  // items: string[] // TODO: check
  userSince: number
  messengerLink: string | null // TODO: check
  profilePictureRef: string | null
  profilePictureURLs: string[]
  roles: string[] // TODO: make use a union type
  // feedback: UserFeedback[]
  badges: any[]
  preferences: {} // TODO: check
  savedItems: string[]
  savedFilters: any[] // TODO: check
  savedDrops: string[]
  followedUsers: string[]
  followedDrops: string[]
  importedFrom: string | null
  id: string // TODO: check
}

export type UserReadonly = Pick<User, "id" | "userSince" | "importedFrom">

export type UserCalculated = {}

export type UserEditable = Omit<User, keyof (UserReadonly & UserCalculated)>

export type UserCreateInputData = Pick<
  User,
  "id" | "name" | "email" | "profilePictureURLs" | "importedFrom"
>

export type UserUpdateInputData = Partial<UserEditable>
