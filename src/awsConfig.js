const stages = {
	development: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://jbfnwqgp7k.execute-api.eu-west-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-west-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_QkGo3xzLl",
			APP_CLIENT_ID: "7cho8982qvnh5sr3gru1bko26a",
			IDENTITY_POOL_ID: "eu-west-1:1097ca1d-2dbd-4c4f-ab4a-dfb36d347334"
		}
	},

	test: {
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
	},

	// Currently a duplicate of the development config
	production: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://jbfnwqgp7k.execute-api.eu-west-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-west-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_QkGo3xzLl",
			APP_CLIENT_ID: "7cho8982qvnh5sr3gru1bko26a",
			IDENTITY_POOL_ID: "eu-west-1:1097ca1d-2dbd-4c4f-ab4a-dfb36d347334"
		}
	}
}

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
