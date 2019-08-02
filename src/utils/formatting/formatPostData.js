import shortid from "shortid"

import isSet from "./isSet"
import { formatInt, formatNonEmptyArray, formatString } from "./basicsUtils"

export const MODE = {
	CREATE: "CREATE",
	EDIT: "EDIT"
}

export const REQUIRED = [
	"title",
	"author",
	"category",
	"mainContent",
	"excerpt",
	"tags",
	"attachments",
	"imageUrls",
	"mainImageIndex"
]

export const formatPostDataForDb = (data, mode, flagState = true) => {
	let formatted = {}

	// check if all required values are present while creating
	if (mode === MODE.CREATE) {
		for (const field of REQUIRED) {
			if (!data[field]) {
				throw new Error("missing required data in: " + field)
			}
		}
	}

	// format incoming values
	if ([MODE.CREATE, MODE.EDIT].includes(mode)) {
		// title
		if (isSet(data.title)) {
			formatted.title = formatString(data.title)
		}

		// author
		if (isSet(data.author)) {
			formatted.author = formatString(data.author)
		}

		// category
		if (isSet(data.category)) {
			formatted.category = formatString(data.category)
		}

		// mainContent
		if (isSet(data.mainContent)) {
			formatted.mainContent = formatString(data.mainContent)
		}

		// excerpt
		if (isSet(data.excerpt)) {
			formatted.excerpt = formatString(data.excerpt)
		}

		// tags
		if (isSet(data.tags)) {
			formatted.tags = formatNonEmptyArray(data.tags)
		}

		// attachments
		if (isSet(data.attachments)) {
			formatted.attachments = formatNonEmptyArray(data.attachments)
		}

		// mainImageIndex
		if (isSet(data.mainImageIndex)) {
			// the minimum/default index is 0
			formatted.mainImageIndex = Math.max(0, formatInt(data.mainImageIndex))
		}
	}

	if (mode === MODE.CREATE) {
		formatted.id = shortid.generate()

		formatted.createdAt = Date.now()
		formatted.editedAt = Date.now()

		formatted.isArchived = false
	}

	if (mode === MODE.EDIT) {
		formatted.editedAt = Date.now()
	}

	return formatted
}
