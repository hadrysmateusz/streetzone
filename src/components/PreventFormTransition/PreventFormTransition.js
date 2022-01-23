import { useFormState } from "react-final-form"
import { Prompt } from "react-router-dom"

const PreventFormTransition = () => {
  const formState = useFormState()

  return (
    <Prompt
      when={formState.dirty}
      message={"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
    />
  )
}

export default PreventFormTransition
