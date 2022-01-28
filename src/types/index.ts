import app from "firebase/compat/app"

export type ThumbnailSizePostfix = "S" | "M" | "L"

// TODO: find better place for this type
export interface MergedUser extends app.firestore.DocumentData {
  uid: string // TODO: maybe remove this in favor of User.id
  emailVerified: boolean
}
