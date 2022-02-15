import { nanoid } from "nanoid"

import { ensurePositiveInt, removeDuplicates, trimString } from "../helpers"
import { createModel } from "../createModel"

import {
  Drop,
  DropCalculated,
  DropCreateInputData,
  DropEditable,
  DropReadonly,
} from "./types"
import { calculateDropsAtApproxTimestamp } from "./helpers"
import {KeyType, ModelledFirestoreCollectionNames, Schema} from "../types"

const dropSchema: Schema<
  Drop,
  DropReadonly,
  DropEditable,
  DropCalculated,
  DropCreateInputData
> = {
  collectionName: ModelledFirestoreCollectionNames.drops,
  schema: {
    id: KeyType.READONLY,
    createdAt: KeyType.READONLY,

    name: KeyType.EDITABLE,
    description: KeyType.EDITABLE,
    designers: KeyType.EDITABLE,
    itemCategory: KeyType.EDITABLE,
    price: KeyType.EDITABLE,
    buyAt: KeyType.EDITABLE,
    tags: KeyType.EDITABLE,
    attachments: KeyType.EDITABLE,
    imageUrls: KeyType.EDITABLE,
    mainImageIndex: KeyType.EDITABLE,
    isArchived: KeyType.EDITABLE,
    dropsAtString: KeyType.EDITABLE,

    dropsAtApproxTimestamp: KeyType.CALCULATED,
    editedAt: KeyType.CALCULATED,
  },
  createEditable: (input): DropEditable => ({
    ...input,
    isArchived: false,
  }),
  createReadonly: (): DropReadonly => ({ id: nanoid(), createdAt: Date.now() }),
  formatEditable: (editable) => {
    editable.name = trimString(editable.name)
    editable.description = trimString(editable.description)
    editable.dropsAtString = trimString(editable.dropsAtString)
    editable.mainImageIndex = ensurePositiveInt(editable.mainImageIndex)
    editable.tags = removeDuplicates(editable.tags)
  },
  createCalculated: (editable): DropCalculated => ({
    editedAt: Date.now(),
    dropsAtApproxTimestamp: calculateDropsAtApproxTimestamp(
      editable.dropsAtString
    ),
  }),
}

export const dropModel = createModel(dropSchema)
