import { ITEM_SCHEMA } from "../../constants"

export default async (user, firebase) => {
	let res = {
		availableItems: [],
		soldItems: [],
		error: null
	}

	try {
		const items = await Promise.all(
			user.items.map((itemID) => firebase.getItemData(itemID))
		)

		for (let item of items) {
			if (item.status === ITEM_SCHEMA.status.available) {
				res.availableItems.push(item)
			} else if (item.status === ITEM_SCHEMA.status.sold) {
				res.soldItems.push(item)
			}
		}
	} catch (error) {
		res.error = error
	} finally {
		return res
	}
}
