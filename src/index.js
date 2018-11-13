import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import Amplify from "@aws-amplify/core"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSpinner, faSync } from "@fortawesome/free-solid-svg-icons"
import * as serviceWorker from "./serviceWorker"
import awsConfig from "./awsConfig"
import App from "./App"
import { Authenticator } from "aws-amplify-react"
import "./scss/index.scss"

library.add(faSpinner, faSync)

let config = {
	Auth: {
		identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
		region: awsConfig.cognito.REGION,
		userPoolId: awsConfig.cognito.USER_POOL_ID,
		userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
		mandatorySignIn: false
	},
	Storage: {
		region: awsConfig.s3.REGION,
		bucket: awsConfig.s3.BUCKET,
		identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
		level: "protected"
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
}

Amplify.configure(config)

ReactDOM.render(
	<Router>
		{/* Reasons to not use authenticator component: it uses federated identities instead of user pool */}
		{/* <Authenticator
			// hideDefault={true}
			onStateChange={(e) => console.log("AUTH STATE CHANGE: ", e)}
			federated={{ facebook_app_id: "559041151184975" }}
		> */}
		<App />
		{/* </Authenticator> */}
	</Router>,
	document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
