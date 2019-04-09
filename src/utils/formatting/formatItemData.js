import shortid from "shortid"

import isNonEmptyArray from "../isNonEmptyArray"

export const MODE = {
	CREATE: "CREATE",
	EDIT: "EDIT",
	REFRESH: "REFRESH",
	PROMOTE: "PROMOTE",
	ARCHIVE: "ARCHIVE",
	VERIFY: "VERIFY"
}

export const REQUIRED = [
	"name",
	"designers",
	"category",
	"price",
	"condition",
	"attachments",
	"userId"
]

const formatNonEmptyArray = (val) => {
	if (isNonEmptyArray(val)) {
		return val
	} else {
		throw new Error("a property expected a non-empty array")
	}
}

const formatString = (val) => {
	return "" + val.trim()
}

const formatFloat = (val) => {
	return Number.parseFloat(val)
}

const formatInt = (val) => {
	return Number.parseInt(val)
}

export const formatItemDataForDb = (data, mode, flagState = true) => {
	let formatted = {}

	if ([MODE.CREATE, MODE.EDIT].includes(mode)) {
		if (mode === MODE.CREATE) {
			// check if all required values are present
			for (const field of REQUIRED) {
				if (!data[field]) {
					throw new Error("missing required data")
				}
			}
		}

		// designers
		if (data.designers !== undefined) {
			formatted.designers = formatNonEmptyArray(data.designers)
		}

		// attachments
		if (data.attachments !== undefined) {
			formatted.attachments = formatNonEmptyArray(data.attachments)
		}

		// name
		if (data.name !== undefined) {
			formatted.name = formatString(data.name)
		}

		// category
		if (data.category !== undefined) {
			formatted.category = formatString(data.category)
		}

		// price
		if (data.price !== undefined) {
			formatted.price = formatInt(data.price)
		}

		// condition
		if (data.condition !== undefined) {
			formatted.condition = formatFloat(data.condition)
		}

		// userId
		if (data.userId !== undefined) {
			formatted.userId = formatString(data.userId)
		}

		// size
		if (data.size !== undefined) {
			formatted.size = formatString(data.size)
		}

		// description
		if (data.description !== undefined) {
			formatted.description = formatString(data.description)
		}
	}

	if (mode === MODE.CREATE) {
		formatted.id = shortid.generate()

		formatted.createdAt = Date.now()
		formatted.refreshedAt = Date.now()
		formatted.modifiedAt = Date.now()
		/* has to be null, otherwise it would show up in promoted section */
		formatted.promotedAt = null

		formatted.isArchived = false
		formatted.isVerified = false
	}

	if (mode === MODE.EDIT) {
		formatted.modifiedAt = Date.now()
		formatted.isVerified = false
	}

	if (mode === MODE.REFRESH) {
		formatted.refreshedAt = Date.now()
	}

	if (mode === MODE.PROMOTE) {
		formatted.promotedAt = Date.now()
	}

	if (mode === MODE.ARCHIVE) {
		formatted.isArchived = flagState
	}

	if (mode === MODE.VERIFY) {
		formatted.isVerified = flagState
	}

	return formatted
}
