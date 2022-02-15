import { User } from "../schema"
import { FormApi } from "final-form"

export type ThumbnailSizePostfix = "S" | "M" | "L"

// TODO: find better place for this type
export interface MergedUser extends User {
  uid: string // TODO: maybe remove this in favor of User.id everywhere
  emailVerified: boolean
}

export type FinalFormErrors<FormValues> = Partial<
  Record<keyof FormValues, string>
>

export type FinalFormOnSubmit<FormValues> = (
  values: FormValues,
  form: FormApi<FormValues, Partial<FormValues>>
) => Promise<void>
