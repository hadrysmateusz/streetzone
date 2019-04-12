import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import useAuthentication from "../../hooks/useAuthentication"
import { ROUTES } from "../../constants"

const withAuthorization = (condition) => (Component) =>
	withRouter((props) => {
		const authUser = useAuthentication()
		const [isAuthorized, setIsAuthorized] = useState(false)

		useEffect(() => {
			if (condition(authUser, props.match.params)) {
				setIsAuthorized(true)
			} else {
				props.history.push(ROUTES.SIGN_IN, { redirectTo: props.location })
			}
		})

		return isAuthorized ? <Component {...props} /> : null
	})

export default withAuthorization
