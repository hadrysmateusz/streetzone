import React, { useEffect, useState } from "react"
import { useHistory, useLocation, useRouteMatch } from "react-router-dom"
import cloneDeep from "lodash/cloneDeep"

import { route } from "../../utils"
import useAuthentication from "../../hooks/useAuthentication"
import { MergedUser } from "../../types"

type ConditionFn = (
  authUser: MergedUser | null, // ReturnType<typeof useAuthentication>,
  matchParams: Record<string, any>
) => boolean | string

const withAuthorization =
  (condition: ConditionFn, unsatisfiedMessage?: string) =>
  <P extends object>(Component: React.ComponentType<P>) =>
  (props: P & { authUser: MergedUser }) => {
    const match = useRouteMatch()
    const history = useHistory()
    const location = useLocation()
    const authUser = useAuthentication()
    const [isAuthorized, setIsAuthorized] = useState(false)

    console.log("authUser", cloneDeep(authUser))

    useEffect(() => {
      let result
      try {
        result = condition(authUser, match.params)
      } catch (error) {
        console.error(
          "caught error in withAuthorization condition callback, more details below"
        )
        console.error(error)
        setIsAuthorized(false)
        return
      }

      // If result is a string treat it as a denial message
      if (typeof result === "string") {
        history.replace(route("SIGN_IN"), {
          redirectTo: location,
          redirectReason: {
            message: result,
          },
        })
      }
      // If the result is exactly true allow access
      else if (result === true) {
        setIsAuthorized(true)
      }
      // TODO: probably replace the system of having condition callback returning a string in favor of passing it as arg to withAuthorization
      // Otherwise, deny access with the default message ( or optionally the one provided as argument )
      else {
        history.replace(route("SIGN_IN"), {
          redirectTo: location,
          redirectReason: {
            message: unsatisfiedMessage ?? "Nie masz wystarczających pozwoleń",
          },
        })
      }
    }, [authUser, history, location, match.params])

    return authUser && isAuthorized ? (
      <Component {...props} authUser={authUser} />
    ) : null
  }

export default withAuthorization
