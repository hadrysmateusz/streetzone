import React from "react"
import ReactDOM from "react-dom"
import Amplify from "aws-amplify"
import { BrowserRouter as Router } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons"
import * as serviceWorker from "./serviceWorker"
import awsConfig from "./awsConfig"
import App from "./App"
import "./scss/index.scss"

library.add(faSpinner, faSync)

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
