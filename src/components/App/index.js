import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { withAuthenticationProvider } from "../UserSession"
import { withFirebase } from "../Firebase"
import { withGlobalContextProvider } from "../GlobalContext"
import { Routes } from "../Routes"
import PageHeader from "../PageHeader"
import Footer from "../Footer"
import FlashMessages from "../FlashMessages"

const AppContainer = styled.div`
  position: relative;
  z-index: 0;
`

class App extends React.Component {
  render = () => {
    return (
      <Router>
        {/* <Meta /> */}
        <FlashMessages>
          <AppContainer id="App-Element">
            <PageHeader />
            <Routes />
            <Footer />
          </AppContainer>
        </FlashMessages>
      </Router>
    )
  }
}

export default compose(withFirebase, withAuthenticationProvider, withGlobalContextProvider)(App)
