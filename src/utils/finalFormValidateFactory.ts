import { FinalFormErrors } from "../types";
import { ValidationErrors } from "final-form";

export function validateFactory<FormValues>(
  callback: (values: FormValues, errors: FinalFormErrors<FormValues>) => void
): (values: FormValues) => ValidationErrors {
  return (values: FormValues) => {
    const errors: FinalFormErrors<FormValues> = {}
    callback(values, errors)
    console.warn(errors)
    return errors as ValidationErrors
  }
}