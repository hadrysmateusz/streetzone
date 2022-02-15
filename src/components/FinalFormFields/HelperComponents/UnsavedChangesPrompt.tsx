import { Prompt } from "react-router-dom"
import { useFormState } from "react-final-form"
import { useMemo } from "react"
import { FormState } from "final-form"

export function UnsavedChangesPrompt<
  FormValues = any,
  InitialFormValues = any
>({
  when,
  message = "Zmiany nie zostały zapisane. Czy na pewno chcesz wyjść?",
}: {
  when?: (formState: FormState<FormValues, InitialFormValues>) => boolean
  message?: string
}) {
  const formState = useFormState<FormValues, InitialFormValues>()

  const calculatedWhen: boolean = useMemo(() => {
    if (when) {
      return when(formState)
    } else {
      return Object.values(formState.values).length > 0 && !formState.pristine
    }
  }, [formState, when])

  return <Prompt when={calculatedWhen} message={message} />
}
