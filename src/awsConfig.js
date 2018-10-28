const stages = {
	dev: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://ey9b5u8yhb.execute-api.eu-west-1.amazonaws.com/dev"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_WzEFM9ETN",
			APP_CLIENT_ID: "2cjlq90nc7bulka8c2ko81ae5k",
			IDENTITY_POOL_ID: "eu-west-1:aac3a416-27da-421b-ac93-8ec6ce83fb04"
		}
	},

	prod: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: ""
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "",
			APP_CLIENT_ID: "",
			IDENTITY_POOL_ID: ""
		}
	}
}

const awsConfig = stages[process.env.REACT_APP_STAGE] || stages.dev

export default awsConfig
