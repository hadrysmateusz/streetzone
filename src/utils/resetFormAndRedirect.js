import { route } from "./index"

// TODO: enforce through types that route name has to be a valid route name
export const resetFormAndRedirect = (form, history) => (...routeParams) => {
  setTimeout(() => {
    form.reset()
    history.push(route(routeParams))
  })
}

// TODO: figure out if this is a good approach or if it should be universally replaced with a redirect to specified route
export const resetFormAndGoBack = (form, history) => () => {
  setTimeout(() => {
    form.reset()
    history.goBack()
  })
}
