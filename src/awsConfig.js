const stages = {
	development: {
		apiGateway: {
			REGION: "eu-west-1",
			URL: "https://ejgd601bzj.execute-api.eu-west-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-west-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_yRWLFgy8d",
			APP_CLIENT_ID: "7gb03lcr4vqtts3kare9uhjgrb",
			IDENTITY_POOL_ID: "eu-west-1:a775a382-17f1-4c4a-85f9-6cb072c71231"
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
			URL: "https://ejgd601bzj.execute-api.eu-west-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-west-1",
			BUCKET: "streetwear-dev-images-bucket"
		},
		cognito: {
			REGION: "eu-west-1",
			USER_POOL_ID: "eu-west-1_yRWLFgy8d",
			APP_CLIENT_ID: "7gb03lcr4vqtts3kare9uhjgrb",
			IDENTITY_POOL_ID: "eu-west-1:a775a382-17f1-4c4a-85f9-6cb072c71231"
		}
	}
}

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
