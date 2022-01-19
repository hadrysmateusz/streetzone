const moment = require("./momentConfig")
const { db } = require("./firebaseConfig")

class PromotingLevel {
	constructor(level, cost, duration, bumps) {
		this.level = level
		this.cost = cost
		this.duration = duration
		this.bumps = bumps
	}

	formatForDb(oldData) {
		const { promotedUntil: startAt = Date.now(), bumps: remainingBumps = 0 } = oldData

		const promotedUntil = moment(startAt)
			.add(this.duration, "days")
			.valueOf()

		return {
			promotedAt: Date.now(),
			promotedUntil,
			promotingLevel: this.level,
			bumps: this.bumps + remainingBumps
		}
	}
}

class PromotingManager {
	constructor() {
		this.levels = new Map()
	}

	addLevel(object) {
		const level = object.level
		if (this.levels.has(level)) {
			throw Error("This promoting level already exists")
		}
		this.levels.set(level, object)
	}

	getLevel(level) {
		return this.levels.get(level)
	}

	async promoteItem(itemId, level) {
		const levelObject = this.getLevel(level)

		const oldItemSnap = await db
			.collection("items")
			.doc(itemId)
			.get()
		const oldItemData = oldItemSnap.data()

		const formattedData = levelObject.formatForDb(oldItemData)

		console.log("levelObject", levelObject)
		console.log("formattedData", formattedData)

		return db
			.collection("items")
			.doc(itemId)
			.update(formattedData)
	}
}

const promotingManager = new PromotingManager()

promotingManager.addLevel(new PromotingLevel(0, 499, 7, 0))
promotingManager.addLevel(new PromotingLevel(1, 999, 10, 4))
promotingManager.addLevel(new PromotingLevel(2, 2500, 14, 10))

module.exports = promotingManager
