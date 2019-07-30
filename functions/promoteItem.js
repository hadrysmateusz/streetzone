const axios = require("axios")

const { PRODUCTION_DOMAIN } = require("./const")
const { PAYU_CLIENT_ID, PAYU_CLIENT_SECRET } = require("./environmentVariables")
const { isProd } = require("./firebaseConfig")
const promotingManager = require("./promotingManager")

const CREATE_ORDER_URL = "https://secure.snd.payu.com/api/v2_1/orders"
const GET_OAUTH_TOKEN_URL = "https://secure.snd.payu.com/pl/standard/user/oauth/authorize"

const notifyUrl = isProd
	? "https://us-central1-streetwear-app-prod.cloudfunctions.net/promoteNotification"
	: "https://us-central1-streetwear-app.cloudfunctions.net/promoteNotification"

const continueUrl = isProd
	? `https://${PRODUCTION_DOMAIN}/po-promowaniu`
	: "http://localhost:3000/po-promowaniu"

const promoteItem = async (data, context) => {
	const { itemId, customerIp, level } = data
	let access_token

	try {
		const res = await axios.post(
			GET_OAUTH_TOKEN_URL,
			`grant_type=client_credentials&client_id=${PAYU_CLIENT_ID}&client_secret=${PAYU_CLIENT_SECRET}`
		)

		access_token = res.data.access_token
	} catch (err) {
		return err
	}

	try {
		const { cost } = promotingManager.getLevel(level)

		const merchantPosId = PAYU_CLIENT_ID

		const additionalDescription = JSON.stringify({ itemId, level })

		const createOrderData = {
			notifyUrl,
			continueUrl,
			customerIp,
			merchantPosId,
			description: `Promote Listing ${itemId}`,
			additionalDescription,
			currencyCode: "PLN",
			totalAmount: cost,
			products: [
				{
					name: `Promote Listing ${itemId} (Level-${level})`,
					unitPrice: cost,
					quantity: "1"
				}
			],
			buyer: {
				extCustomerId: context.auth.uid || null,
				email: context.auth.token.email || null,
				firstName: context.auth.token.name || null,
				language: "pl"
			}
		}

		const createOrderOptions = {
			maxRedirects: 0,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`
			}
		}

		console.log(createOrderData)
		console.log(createOrderOptions)

		await axios.post(CREATE_ORDER_URL, createOrderData, createOrderOptions)
	} catch (err) {
		return err.response.data
	}
}

module.exports = promoteItem
