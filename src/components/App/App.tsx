import { BrowserRouter as Router } from "react-router-dom"
import { Helmet } from "react-helmet"

import { CONST } from "../../constants"

import PageHeader from "../PageHeader"
import Routes from "../Routes"
import Footer from "../Footer"
import { AuthUserProvider } from "../UserSession"

import { AppContainer } from "./App.styles"
import { FlashMessagesProvider } from "../FlashMessages";

const App = () => (
  <AuthUserProvider>
    <Router>
      <FlashMessagesProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{CONST.BRAND_NAME}</title>
        </Helmet>
        <AppContainer id="App-Element">
          <PageHeader />
          <Routes />
          <Footer />
        </AppContainer>
      </FlashMessagesProvider>
    </Router>
  </AuthUserProvider>
)

export default App
