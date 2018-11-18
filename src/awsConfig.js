const stages = {
	development: {
		apiGateway: {
			REGION: "eu-central-1",
			URL: "https://dqmk14o709.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_SR0p8iEv9",
			APP_CLIENT_ID: "5230m6nigd23uo7b50gqsir8np",
			IDENTITY_POOL_ID: "eu-central-1:ee18470a-40f8-4e5d-9556-1f88b427eb47"
		}
	},

	test: {
		apiGateway: {
			REGION: "",
			URL: ""
		},
		s3: {
			REGION: "",
			BUCKET: ""
		},
		cognito: {
			REGION: "",
			USER_POOL_ID: "",
			APP_CLIENT_ID: "",
			IDENTITY_POOL_ID: ""
		}
	},

	production: {
		apiGateway: {
			REGION: "eu-central-1",
			URL: "https://dqmk14o709.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_SR0p8iEv9",
			APP_CLIENT_ID: "5230m6nigd23uo7b50gqsir8np",
			IDENTITY_POOL_ID: "eu-central-1:ee18470a-40f8-4e5d-9556-1f88b427eb47"
		}
	}
}

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
