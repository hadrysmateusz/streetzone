import { nanoid } from "nanoid"

import { trimString } from "../helpers"
import { createModel } from "../createModel"

import {
  Deal,
  DealCalculated,
  DealCreateInputData,
  DealEditable,
  DealReadonly,
} from "./types"
import {KeyType, ModelledFirestoreCollectionNames, Schema} from "../types"

const dealSchema: Schema<
  Deal,
  DealReadonly,
  DealEditable,
  DealCalculated,
  DealCreateInputData
> = {
  collectionName: ModelledFirestoreCollectionNames.deals,
  schema: {
    id: KeyType.READONLY,
    createdAt: KeyType.READONLY,

    title: KeyType.EDITABLE,
    description: KeyType.EDITABLE,
    designers: KeyType.EDITABLE,
    value: KeyType.EDITABLE,
    imageRef: KeyType.EDITABLE,
    link: KeyType.EDITABLE,
    isArchived: KeyType.EDITABLE,

    editedAt: KeyType.CALCULATED,
  },
  createEditable: (input): DealEditable => ({
    ...input,
    isArchived: false,
  }),
  createReadonly: (): DealReadonly => ({ id: nanoid(), createdAt: Date.now() }),
  formatEditable: (editable) => {
    editable.title = trimString(editable.title)
    editable.description = trimString(editable.description)
  },
  createCalculated: (): DealCalculated => ({ editedAt: Date.now() }),
}

export const dealModel = createModel(dealSchema)
