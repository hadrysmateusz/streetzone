import { FormApi } from "final-form"
import { useHistory } from "react-router-dom"
import { route } from "./index"

// TODO: enforce through types that route name has to be a valid route name
export const resetFormAndRedirect =
  (form: FormApi, history: ReturnType<typeof useHistory>) =>
  (...routeParams: Parameters<typeof route>) => {
    setTimeout(() => {
      form.reset()
      history.push(route(...routeParams))
    })
  }

// TODO: figure out if this is a good approach or if it should be universally replaced with a redirect to specified route
export const resetFormAndGoBack = (form: FormApi, history: ReturnType<typeof useHistory>) => () => {
  setTimeout(() => {
    form.reset()
    history.goBack()
  })
}
