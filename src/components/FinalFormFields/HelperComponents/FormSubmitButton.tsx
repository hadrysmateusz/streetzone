import React from "react"
import { useFormState } from "react-final-form"

import { LoaderButton, LoaderButtonProps } from "../../Button"

type FormSubmitButtonProps = Omit<
  LoaderButtonProps,
  "isLoading" | "disabled" | "text"
> & { disabled?: true | undefined; text: string }

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  disabled,
  fullWidth = true,
  primary = true,
  ...props
}) => {
  const { submitting, pristine } = useFormState()

  return (
    <LoaderButton
      type="submit"
      isLoading={submitting}
      /* If disabled is explicitly set to true, force disable the button, otherwise base the value on form status */
      disabled={disabled === true ? disabled : submitting || pristine}
      fullWidth={fullWidth}
      primary={primary}
      {...props}
    />
  )
}
