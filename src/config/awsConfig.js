const stages = {
	development: {
		apiGateway: {
			REGION: "eu-central-1",
			URL: "https://tiowvs0wgh.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-imagesbucket-k11bcldx718y"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_UsObjCfJK",
			APP_CLIENT_ID: "5e7u6o8ju386efgje2cm0473io",
			IDENTITY_POOL_ID: "eu-central-1:ee66018b-e10b-4e1f-9398-b26b8245be1e"
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
			URL: "https://tiowvs0wgh.execute-api.eu-central-1.amazonaws.com/dev"
		},
		s3: {
			REGION: "eu-central-1",
			BUCKET: "streetwear-dev-imagesbucket-k11bcldx718y"
		},
		cognito: {
			REGION: "eu-central-1",
			USER_POOL_ID: "eu-central-1_UsObjCfJK",
			APP_CLIENT_ID: "5e7u6o8ju386efgje2cm0473io",
			IDENTITY_POOL_ID: "eu-central-1:ee66018b-e10b-4e1f-9398-b26b8245be1e"
		}
	}
}

const awsConfig = stages[process.env.NODE_ENV] || stages.development

export default awsConfig
