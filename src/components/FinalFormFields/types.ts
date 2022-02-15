import { SimpleFFWrapperProps } from "./HelperComponents"

export type ErrorAndInfoProps = {
  info?: string
  error?: string
}

export type CommonUnwrappedFieldProps = {
  name: string
  info?: string
}

export type CommonFieldProps = CommonUnwrappedFieldProps &
  Partial<SimpleFFWrapperProps>
