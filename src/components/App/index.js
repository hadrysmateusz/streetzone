import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"
import { Helmet } from "react-helmet"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import Routes from "../Routes"
import Footer from "../Footer"
import { CONST } from "../../constants"

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
`

const Container = styled.div`
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: max-content 1fr auto;
	min-height: calc(100% - ${HEADER_HEIGHT}); /* changing this to "height" causes issues */
	gap: 20px;
`

const BaseContainer = styled.div`
	height: 100vh;
	min-height: 100vh;
	overflow-y: scroll;
`

const App = () => (
	<Router>
		<BaseContainer id="base-scroll-container">
			<Helmet>
				<title>{CONST.BRAND_NAME}</title>
			</Helmet>
			<Header>
				<span>{CONST.BRAND_NAME}</span>
			</Header>
			<Container>
				<Navigation />
				<Routes />
				<Footer />
			</Container>
		</BaseContainer>
	</Router>
)

export default compose(
	withFirebase,
	withAuthenticationProvider
)(App)
