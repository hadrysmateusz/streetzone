import React, { useCallback, useMemo } from "react"
import { useForm, useFormState } from "react-final-form"
import { useHistory } from "react-router-dom"
import { FormApi } from "final-form"

import { Button, ButtonProps } from "../../Button"

type FormCancelButtonProps = Omit<ButtonProps, "disabled" | "text"> & {
  disabled?: true | undefined
  text: string
  onCancel?: ({
    form,
    history,
  }: {
    form: FormApi
    history: ReturnType<typeof useHistory>
  }) => void
}

export const FormCancelButton: React.FC<FormCancelButtonProps> = ({
  disabled,
  fullWidth = true,
  text,
  onCancel,
  ...props
}) => {
  const { submitting } = useFormState()
  const history = useHistory() // TODO: probably replace this with a more intentional re-routing system
  const form = useForm()

  const defaultOnCancel = useCallback(() => {
    history.goBack()
  }, [history])

  const onClick = useMemo(() => {
    if (onCancel) {
      return () => onCancel({ form, history })
    } else {
      return defaultOnCancel
    }
  }, [defaultOnCancel, form, history, onCancel])

  return (
    <Button
      type="button"
      {...props}
      fullWidth={fullWidth}
      /* If disabled is explicitly set to true, force disable the button, otherwise base the value on form status */
      disabled={disabled === true ? disabled : submitting}
      /* TODO: I could expose history and form api in onCancel to make this component more flexible and allow higher level abstractions of forms */
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
