import React from "react"
import ReactDOM from "react-dom"
import Amplify from "aws-amplify"
import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import awsConfig from "./awsConfig"
import * as serviceWorker from "./serviceWorker"

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: awsConfig.cognito.REGION,
		userPoolId: awsConfig.cognito.USER_POOL_ID,
		identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: "items",
				endpoint: awsConfig.apiGateway.URL,
				region: awsConfig.apiGateway.REGION
			}
		]
	}
})

const typography = new Typography(fairyGatesTheme)
typography.injectStyles()

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
