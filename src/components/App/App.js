import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components/macro"
import { Helmet } from "react-helmet"

import { CONST } from "../../constants"

import { withAuthenticationProvider } from "../UserSession"
import { FlashMessages } from "../FlashMessages"
import { withFirebase } from "../Firebase"
import PageHeader from "../PageHeader"
import Routes from "../Routes"
import Footer from "../Footer"

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

export default compose(withFirebase, withAuthenticationProvider)(App)
