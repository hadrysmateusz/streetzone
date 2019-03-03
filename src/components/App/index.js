import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import { Routes, Meta } from "../Routes"
import Footer from "../Footer"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"

const ContentContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

const AppContainer = styled.div`
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`

class App extends React.Component {
	render = () => {
		return (
			<Router>
				<div id="App-Element">
					<Meta />
					<AppContainer>
						<Navigation />
						<ContentContainer>
							<Routes />
						</ContentContainer>
						<Footer />
					</AppContainer>
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
