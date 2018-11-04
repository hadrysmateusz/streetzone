const stages = {
	development: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://36v6zocygg.execute-api.eu-west-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-west-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_Qw1jxdPzT",
			APP_CLIENT_ID: "5cdq6tmbrpm6aqbej1qip0duhq",
			IDENTITY_POOL_ID: "eu-west-1:5411f17d-e01c-4e8a-9d22-ff0f8104a7f2"
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

	production: {
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

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
