import { useField, UseFieldConfig } from "react-final-form";
import { getFormError } from "./misc";

/**
 * Successor to useFinalFormFieldAdapter. Wraps the useField hook with custom error string calculation
 * @param name Name of the form field
 * @param config Config object for useField
 */
export const useFieldWithError = <
  FieldValue = any,
  Element extends HTMLElement = HTMLElement
>(
  name: string,
  config?: UseFieldConfig<FieldValue, FieldValue>
) => {
  const { input, meta } = useField<FieldValue, Element>(name, config)
  const error = getFormError(meta)
  return { input, meta, error }
}
