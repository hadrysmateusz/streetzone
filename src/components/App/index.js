import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import { Routes, Meta } from "../Routes"
import Footer from "../Footer"
import { CONST } from "../../constants"
import { withGlobalContextProvider } from "../GlobalContext"
import AuthModal from "../AuthModal"

const HEADER_HEIGHT = "66px"

const Header = styled.div`
	color: ${(p) => p.theme.colors.black[25]};
	background: white;

	height: ${HEADER_HEIGHT};

	display: flex;
	align-items: center;
	justify-content: center;

	text-shadow: 1px 1px 1px ${(p) => p.theme.colors.gray[50]};

	font-size: 2.4rem;
	font-family: "Playfair Display SC", serif;

	animation: transform 1s ease;
`

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
						<Header>{CONST.BRAND_NAME}</Header>
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
