const stages = {
	development: {
		apiGateway: {
			REGION: "eu-central-1",
			URL: "https://ov9jodm6b4.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-imagesbucket-1t3drmbvpd8by"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_NnSTv7GLl",
			APP_CLIENT_ID: "54lu1t4e76e21p1n0r6ibdrfkp",
			IDENTITY_POOL_ID: "eu-central-1:197f3f15-8222-4b36-a9c9-fcb3db983a89"
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
			URL: "https://ov9jodm6b4.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-imagesbucket-1t3drmbvpd8by"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_NnSTv7GLl",
			APP_CLIENT_ID: "54lu1t4e76e21p1n0r6ibdrfkp",
			IDENTITY_POOL_ID: "eu-central-1:197f3f15-8222-4b36-a9c9-fcb3db983a89"
		}
	}
}

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
