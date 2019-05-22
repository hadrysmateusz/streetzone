import shortid from "shortid"

import isSet from "./isSet"
import { formatInt, formatNonEmptyArray, formatString } from "./basicsUtils"

export const MODE = {
	CREATE: "CREATE",
	EDIT: "EDIT",
	PROMOTE: "PROMOTE",
	ARCHIVE: "ARCHIVE"
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

		// imageUrls
		if (isSet(data.imageUrls)) {
			formatted.imageUrls = formatNonEmptyArray(data.imageUrls)
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
		/* has to be null, otherwise it would show up in promoted section */
		formatted.isPromoted = false

		formatted.isArchived = false
	}

	if (mode === MODE.EDIT) {
		formatted.editedAt = Date.now()
	}

	if (mode === MODE.PROMOTE) {
		formatted.isPromoted = flagState
	}

	if (mode === MODE.ARCHIVE) {
		formatted.isArchived = flagState
	}

	return formatted
}
