import "react-app-polyfill/ie11"
import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components"
import ReactBreakpoints from "react-breakpoints"

import * as serviceWorker from "./serviceWorker"
import "./config/fontAwesomeConfig"
import "./index.css"
import "./normalize.css"

import { THEME } from "./constants"
import App from "./components/App"
import { Firebase, FirebaseContext } from "./components/Firebase"

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<ThemeProvider theme={THEME}>
			<ReactBreakpoints breakpoints={{ ...THEME.breakpoints }}>
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
