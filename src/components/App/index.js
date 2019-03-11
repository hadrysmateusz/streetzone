import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"
import { Routes, Meta } from "../Routes"
import GlobalStyles from "./global-styles"
import PageHeader from "../PageHeader"
import Footer from "../Footer"

const ContentContainer = styled.div`
	flex: 1;
`

class App extends React.Component {
	render = () => {
		return (
			<Router>
				<div id="App-Element">
					<Meta />
					<GlobalStyles>
						<PageHeader />
						<ContentContainer>
							<Routes />
						</ContentContainer>
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
