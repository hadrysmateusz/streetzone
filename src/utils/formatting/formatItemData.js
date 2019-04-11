import shortid from "shortid"

import isNonEmptyArray from "../isNonEmptyArray"
import isSet from "./isSet"

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
		if (isSet(data.designers)) {
			formatted.designers = formatNonEmptyArray(data.designers)
		}

		// attachments
		if (isSet(data.attachments)) {
			formatted.attachments = formatNonEmptyArray(data.attachments)
		}

		// name
		if (isSet(data.name)) {
			formatted.name = formatString(data.name)
		}

		// category
		if (isSet(data.category)) {
			formatted.category = formatString(data.category)
		}

		// price
		if (isSet(data.price)) {
			formatted.price = formatInt(data.price)
		}

		// condition
		if (isSet(data.condition)) {
			formatted.condition = formatFloat(data.condition)
		}

		// userId
		if (isSet(data.userId)) {
			formatted.userId = formatString(data.userId)
		}

		// size
		if (isSet(data.size)) {
			formatted.size = formatString(data.size)
		}

		// description
		if (isSet(data.description)) {
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
