import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import Navigation from "../Navigation"
import Routes from "../Routes"
import Footer from "../Footer"
import { CONST } from "../../constants"

const Header = styled.div`
	color: #333;
	height: 59px;
	box-sizing: border-box;
	margin: 0;

	text-align: center;
	font-size: 2.1rem;
	background: white;
	border-bottom: 1px solid #ddd;
	padding: 10px 0;
	font-family: "Playfair Display SC", serif;
`

const Container = styled.div`
	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: auto 1fr minmax(60px, auto);
	min-height: calc(100% - 59px);
	gap: 20px;
`

const App = () => (
	<Router>
		<>
			<Header>{CONST.BRAND_NAME}</Header>
			<Container>
				<Navigation />
				<div>
					<Routes />
				</div>
				<Footer />
			</Container>
		</>
	</Router>
)

export default compose(
	withFirebase,
	withAuthenticationProvider
)(App)
