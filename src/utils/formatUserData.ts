interface IUserDataInput {
  name: string
  email: string
  uid: string
  picture?: string
  importedFrom?: string
}

// TODO: figure out proper types
export interface IFormattedUserData {
  name: string
  email: string
  city: any
  phone: any
  info: any
  userSince: number
  profilePictureRef: string | null
  profilePictureURLs: string[] | null
  roles: any[]
  feedback: any[]
  badges: any[]
  preferences: {}
  savedItems: any[]
  savedFilters: any[]
  savedDrops: any[]
  followedUsers: any[]
  followedDrops: any[]
  uid: string
  importedFrom: string | null
}

export const formatUserData = (input: IUserDataInput): IFormattedUserData => {
  return {
    name: input.name,
    email: input.email,
    city: null,
    phone: null,
    info: null,
    userSince: Date.now(),
    profilePictureRef: null,
    profilePictureURLs: input.picture ? [input.picture] : null,
    roles: [],
    feedback: [],
    badges: [],
    preferences: {},
    savedItems: [],
    savedFilters: [],
    savedDrops: [],
    followedUsers: [],
    followedDrops: [],
    uid: input.uid,
    importedFrom: input.importedFrom || null,
  }
}

export default formatUserData
