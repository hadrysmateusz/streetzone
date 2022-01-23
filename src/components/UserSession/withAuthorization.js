import { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import useAuthentication from "../../hooks/useAuthentication"
import { route } from "../../utils"

const withAuthorization = (condition) => (Component) =>
  withRouter((props) => {
    const authUser = useAuthentication()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
      const result = condition(authUser, props.match.params)

      // If result is a string treat it as a denial message
      if (typeof result === "string") {
        props.history.replace(route("SIGN_IN"), {
          redirectTo: props.location,
          redirectReason: {
            message: result,
          },
        })
      }
      // If the result is exactly true allow access
      else if (result === true) {
        setIsAuthorized(true)
      }
      // Otherwise deny access with the default message
      else {
        props.history.replace(route("SIGN_IN"), {
          redirectTo: props.location,
          redirectReason: {
            message: "Nie masz wystarczających pozwoleń",
          },
        })
      }
    }, [authUser, props.history, props.location, props.match.params])

    return isAuthorized ? <Component {...props} /> : null
  })

export default withAuthorization
