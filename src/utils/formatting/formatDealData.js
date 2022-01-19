import { nanoid } from "nanoid"

import isSet from "./isSet"
import { formatString } from "./basicsUtils"

export const MODE = {
  CREATE: "CREATE",
  EDIT: "EDIT",
}

export const REQUIRED = ["title", "description", "value", "imageRef", "link"]

export const formatDealDataForDb = (data, mode) => {
  let formatted = {}

  if (!mode) throw Error("A mode is required by the format util")

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

    // description
    if (isSet(data.description)) {
      formatted.description = formatString(data.description)
    }

    // value
    if (isSet(data.value)) {
      formatted.value = formatString(data.value)
    }

    // imageRef
    if (isSet(data.imageRef)) {
      formatted.imageRef = formatString(data.imageRef)
    }

    // link
    if (isSet(data.link)) {
      formatted.link = formatString(data.link)
    }
  }

  if (mode === MODE.CREATE) {
    formatted.id = nanoid()

    formatted.createdAt = Date.now()
    formatted.editedAt = Date.now()

    formatted.isArchived = false
  }

  if (mode === MODE.EDIT) {
    formatted.editedAt = Date.now()
  }

  return formatted
}
