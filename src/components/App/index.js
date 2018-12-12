import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import Routes from "../Routes"

const App = () => (
	<Router>
		<>
			<Navigation />
			<Routes />
		</>
	</Router>
)

export default compose(
	withFirebase,
	withAuthenticationProvider
)(App)
