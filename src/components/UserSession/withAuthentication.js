import React from "react"
import AuthUserContext from "./context"

const withAuthentication = (C) => (props) => {
	return (
		<AuthUserContext.Consumer>
			{(authUser) => <C {...props} authUser={authUser} />}
		</AuthUserContext.Consumer>
	)
}

export default withAuthentication
