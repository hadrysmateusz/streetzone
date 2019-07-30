const express = require("express")
const cors = require("cors")

const promotingManager = require("./promotingManager")

const promoteApp = express()
promoteApp.use(express.json()) // for parsing application/json
promoteApp.use(cors({ origin: true }))
promoteApp.post("/", (req, res) => {
	try {
		const order = req.body.order
		console.log("order:", order)

		if (order.status !== "COMPLETED") {
			return res.status(200).end()
		}

		const { itemId, level } = JSON.parse(order.additionalDescription)

		promotingManager
			.promoteItem(itemId, level)
			.then(() => {
				return res.status(200).end()
			})
			.catch((err) => {
				console.log("There was a problem with updating the item in firestore", err)
				return res.status(500).end()
			})
	} catch (err) {
		console.log(err)
		return res.status(500).end()
	}
})
