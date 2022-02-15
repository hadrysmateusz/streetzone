import ReactDOM from "react-dom"
import { DefaultTheme, ThemeProvider } from "styled-components/macro"
import ReactBreakpoints from "react-breakpoints"
import "react-image-lightbox/style.css"
import moment from "moment"
import "moment/locale/pl"

import * as serviceWorker from "./serviceWorker"
import "./normalize.css"
import "./config/fontAwesomeConfig"

import breakpoints from "./constants/breakpoints"
import { Firebase, FirebaseContext } from "./components/Firebase"
import GlobalStyles from "./components/globalStyles"
import App from "./components/App"

// import * as Sentry from "@sentry/browser"

// configure Sentry
// Sentry.init({
//   dsn: "https://6d71f4345c1e4790900d8d309a1459d2@sentry.io/1442000",
//   environment: process.env.REACT_APP_ENV,
// })

// set moment.js locale
moment.locale("pl")

const theme: DefaultTheme = { breakpoints }

const firebase = new Firebase()

ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <ThemeProvider theme={theme}>
      <ReactBreakpoints
        breakpoints={{ ...breakpoints }}
        debounceResize={true}
        debounceDelay={100}
      >
        <GlobalStyles />
        <App />
      </ReactBreakpoints>
    </ThemeProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
