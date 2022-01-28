import { ensurePositiveInt, removeDuplicates, trimString } from "../helpers"
import { createModel } from "../createModel"

import {
  Item,
  ItemCalculated,
  ItemCreateInputData,
  ItemEditable,
  ItemReadonly,
} from "./types"
import {KeyType, ModelledFirestoreCollectionNames, Schema} from "../types"

const itemSchema: Schema<
  Item,
  ItemReadonly,
  ItemEditable,
  ItemCalculated,
  ItemCreateInputData
> = {
  collectionName: ModelledFirestoreCollectionNames.items,
  schema: {
    id: KeyType.READONLY,
    createdAt: KeyType.READONLY,
    userId: KeyType.READONLY,

    // these values are editable but only from the server (this could merit a new PROTECTED KeyType)
    promotingLevel: KeyType.READONLY,
    promotedAt: KeyType.READONLY,
    promotedUntil: KeyType.READONLY, // TODO: probably make this a calculated value

    name: KeyType.EDITABLE,
    category: KeyType.EDITABLE,
    condition: KeyType.EDITABLE,
    description: KeyType.EDITABLE,
    designers: KeyType.EDITABLE,
    size: KeyType.EDITABLE,
    price: KeyType.EDITABLE,
    attachments: KeyType.EDITABLE,
    mainImageIndex: KeyType.EDITABLE,
    isArchived: KeyType.EDITABLE,

    // TODO: probably move bumps and refreshed to readonly and only modify them from server
    bumps: KeyType.EDITABLE,
    refreshedAt: KeyType.EDITABLE,

    isVerified: KeyType.CALCULATED, // isVerified can't be changed to true from the client as per security rules, but it's changed to false on every edit
    modifiedAt: KeyType.CALCULATED,
  },
  createEditable: (input): ItemEditable => ({
    name: input.name,
    category: input.category,
    condition: input.condition,
    description: input.description,
    designers: input.designers,
    size: input.size,
    price: input.price,
    attachments: input.attachments,
    mainImageIndex: input.mainImageIndex,

    isArchived: false,
    refreshedAt: Date.now(),
    bumps: 0,
  }),
  createReadonly: (input): ItemReadonly => ({
    id: input.id,
    createdAt: Date.now(),
    promotedAt: null,
    promotedUntil: null,
    promotingLevel: null,
    userId: input.userId,
  }),
  formatEditable: (editable) => {
    editable.name = trimString(editable.name)
    editable.description = trimString(editable.description)
    editable.mainImageIndex = ensurePositiveInt(editable.mainImageIndex)
    editable.attachments = removeDuplicates(editable.attachments)
    editable.designers = removeDuplicates(editable.designers)
  },
  createCalculated: (): ItemCalculated => ({
    modifiedAt: Date.now(),
    isVerified: false,
  }),
}

export const itemModel = createModel(itemSchema)
