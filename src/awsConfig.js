const stages = {
	dev: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://rp8yf3el0i.execute-api.eu-west-1.amazonaws.com/dev"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_CXtkphY5i",
			APP_CLIENT_ID: "5l7nk63cko8u4rbja9b3urs1ij",
			IDENTITY_POOL_ID: "eu-west-1:b47423cf-37d0-4248-9cc4-46cfb1d1febc"
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
