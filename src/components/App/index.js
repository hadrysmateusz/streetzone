import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components/macro"
import { Helmet } from "react-helmet"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import { withGlobalContextProvider } from "../GlobalContext"
import Routes from "../Routes"
import PageHeader from "../PageHeader"
import Footer from "../Footer"
import FlashMessages from "../FlashMessages"
import { CONST } from "../../constants"

const AppContainer = styled.div`
  position: relative;
  z-index: 0;
`

const App = () => (
  <Router>
    <FlashMessages>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{CONST.BRAND_NAME}</title>
      </Helmet>
      <AppContainer id="App-Element">
        <PageHeader />
        <Routes />
        <Footer />
      </AppContainer>
    </FlashMessages>
  </Router>
)

export default compose(withFirebase, withAuthenticationProvider, withGlobalContextProvider)(App)
