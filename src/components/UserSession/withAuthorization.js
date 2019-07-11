import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import useAuthentication from "../../hooks/useAuthentication"
import { ROUTES } from "../../constants"

const withAuthorization = (condition) => (Component) =>
	withRouter((props) => {
		const authUser = useAuthentication()
		const [isAuthorized, setIsAuthorized] = useState(false)

		useEffect(() => {
			const __isAuthorized = condition(authUser, props.match.params)
			if (__isAuthorized) {
				setIsAuthorized(true)
			} else {
				props.history.replace(ROUTES.SIGN_IN, {
					redirectTo: props.location,
					redirectReason: {
						message: "Nie masz wystarczających pozwoleń"
					}
				})
			}
		}, [authUser, props.history, props.location, props.match.params])

		return isAuthorized ? <Component {...props} /> : null
	})

export default withAuthorization
