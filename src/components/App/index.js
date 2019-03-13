import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"
import { Routes, Meta } from "../Routes"
import PageHeader from "../PageHeader"
import Footer from "../Footer"

import GlobalStyles from "./global-styles"

class App extends React.Component {
	render = () => {
		return (
			<Router>
				<div id="App-Element">
					<Meta />
					<GlobalStyles>
						<PageHeader />
						<div style={{ flex: 1 }}>
							<Routes />
						</div>
						<Footer />
					</GlobalStyles>
					<AuthModal />
				</div>
			</Router>
		)
	}
}

export default compose(
	withFirebase,
	withAuthenticationProvider,
	withGlobalContextProvider
)(App)
