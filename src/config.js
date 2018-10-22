const dev = {
	apiGateway: {
		REGION: "eu-west-1",
		URL: "https://snum875arj.execute-api.eu-west-1.amazonaws.com/dev"
	},
	cognito: {
		REGION: "eu-west-1",
		USER_POOL_ID: "eu-west-1_w3C6CuZvk",
		APP_CLIENT_ID: "6fm6ilnv0216260bqli9del8lu",
		IDENTITY_POOL_ID: "eu-west-1:da6b2d9d-ccc3-415a-9a3b-c19edf992974"
	}
}

const prod = {
	apiGateway: {
		REGION: "eu-west-1",
		URL: "https://orhnywk2i0.execute-api.eu-west-1.amazonaws.com/prod"
	},
	cognito: {
		REGION: "eu-west-1",
		USER_POOL_ID: "eu-west-1_901CWUycC",
		APP_CLIENT_ID: "7bbrmo8li81us74bsemtpe6fce",
		IDENTITY_POOL_ID: "eu-west-1:4a240325-696e-4822-8713-b7b4f0fe196b"
	}
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev

export default {
	// Add common config values here
	MAX_ATTACHMENT_SIZE: 5000000,
	...config
}
