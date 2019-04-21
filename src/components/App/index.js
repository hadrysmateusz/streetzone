import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"
import { Routes, Meta } from "../Routes"
import PageHeader from "../PageHeader"
import Footer from "../Footer"

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
					{/* <Meta /> */}
					<AppContainer>
						<PageHeader />
						<div style={{ flex: 1 }}>
							<Routes />
						</div>
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
