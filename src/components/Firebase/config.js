// config options for all environments
const config = {
	development: {
		projectId: "streetwear-app",
		appId: "1:1095236809107:web:c017038337276a92",
		databaseURL: "https://streetwear-app.firebaseio.com",
		storageBucket: "streetwear-app.appspot.com",
		locationId: "us-central",
		apiKey: "AIzaSyBRz96ggb3WZQWkTPkcOsA-4pQfDs4cFPM",
		authDomain: "streetwear-app.firebaseapp.com",
		messagingSenderId: "1095236809107"
	},
	production: {
		projectId: "streetzone-prod",
		appId: "1:318333549624:web:e8ec55aab38b38a7",
		databaseURL: "https://streetzone-prod.firebaseio.com",
		storageBucket: "streetzone-prod.appspot.com",
		locationId: "europe-west2",
		apiKey: "AIzaSyC7SJ7j_dk3xV8g4Bg9nz62NcZXbETFhyQ",
		authDomain: "streetzone-prod.firebaseapp.com",
		messagingSenderId: "318333549624"
	}
}

// select correct set of options based on the NODE_ENV environment variable
export default config[process.env.NODE_ENV]
