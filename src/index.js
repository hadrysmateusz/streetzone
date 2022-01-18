import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components/macro"
import ReactBreakpoints from "react-breakpoints"
import "react-image-lightbox/style.css"
// import * as Sentry from "@sentry/browser"
import moment from "moment"
import "moment/locale/pl"

import * as serviceWorker from "./serviceWorker"
import "./normalize.css"
import "./config/fontAwesomeConfig"

import breakpoints from "./constants/breakpoints"
import App from "./components/App"
import { Firebase, FirebaseContext } from "./components/Firebase"
import GlobalStyles from "./components/GlobalStyles"

// set moment.js locale
moment.locale("pl")

// configure Sentry
// Sentry.init({
//   dsn: "https://6d71f4345c1e4790900d8d309a1459d2@sentry.io/1442000",
//   environment: process.env.REACT_APP_ENV,
// })

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ThemeProvider theme={{ breakpoints }}>
      <ReactBreakpoints breakpoints={{ ...breakpoints }}>
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
