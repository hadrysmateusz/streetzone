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
		// check if all required values are present
		for (const field of REQUIRED) {
			if (!data[field]) {
				throw new Error("missing required data")
			}
		}

		// REQUIRED
		formatted.designers = formatNonEmptyArray(data.designers)
		formatted.attachments = formatNonEmptyArray(data.attachments)
		formatted.name = formatString(data.name)
		formatted.category = formatString(data.category)
		formatted.price = formatInt(data.price)
		formatted.condition = formatFloat(data.condition)
		formatted.userId = formatString(data.userId)

		// OPTIONAL
		formatted.size = data.size ? formatString(data.size) : null
		formatted.description = data.description ? formatString(data.description) : null
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
