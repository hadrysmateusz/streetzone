import { ensurePositiveInt, removeDuplicates, trimString } from "../helpers"
import { createModel } from "../createModel"

import {
  Post,
  PostCalculated,
  PostCreateInputData,
  PostEditable,
  PostReadonly,
} from "./types"
import {KeyType, ModelledFirestoreCollectionNames, Schema} from "../types"

const postSchema: Schema<
  Post,
  PostReadonly,
  PostEditable,
  PostCalculated,
  PostCreateInputData
> = {
  collectionName: ModelledFirestoreCollectionNames.posts,
  schema: {
    id: KeyType.READONLY,
    createdAt: KeyType.READONLY,

    title: KeyType.EDITABLE,
    author: KeyType.EDITABLE,
    category: KeyType.EDITABLE,
    mainContent: KeyType.EDITABLE,
    excerpt: KeyType.EDITABLE,
    tags: KeyType.EDITABLE,
    attachments: KeyType.EDITABLE,
    imageUrls: KeyType.EDITABLE,
    mainImageIndex: KeyType.EDITABLE,
    isArchived: KeyType.EDITABLE,
    isPromoted: KeyType.EDITABLE,

    editedAt: KeyType.CALCULATED,
  },
  createEditable: (input): PostEditable => ({
    ...input,
    isArchived: false,
    isPromoted: false,
  }),
  createReadonly: (input): PostReadonly => ({
    id: input.id,
    createdAt: Date.now(),
  }),
  formatEditable: (editable) => {
    editable.title = trimString(editable.title)
    editable.excerpt = trimString(editable.excerpt)
    editable.mainImageIndex = ensurePositiveInt(editable.mainImageIndex)
    editable.tags = removeDuplicates(editable.tags)
  },
  createCalculated: (): PostCalculated => ({ editedAt: Date.now() }),
}

export const postModel = createModel(postSchema)

// import { nanoid } from "nanoid"
//
// import {
//   createModel,
//   ensurePositiveInt,
//   removeDuplicates,
//   Schema,
//   trimString,
// } from "../helpers"
//
// import {
//   Post,
//   PostCalculated,
//   PostCreateInputData,
//   PostEditable,
//   PostReadonly,
// } from "./types"
//
// const formatSchema: Schema<
//     Post,
//     PostReadonly,
//     PostEditable,
//     PostCalculated,
//     PostCreateInputData
//     > = {
//   readonlyKeys: ["id", "createdAt"],
//   editableKeys: [
//     "title",
//     "author",
//     "category",
//     "mainContent",
//     "excerpt",
//     "tags",
//     "attachments",
//     "imageUrls",
//     "mainImageIndex",
//     "isArchived",
//     "isPromoted",
//   ],
//   createEditable: (input) => ({
//     ...input,
//     isArchived: false,
//     isPromoted: false,
//   }),
//   createReadonly: (_input) => ({ id: nanoid(), createdAt: Date.now() }),
//   formatEditable: (editable) => {
//     editable.title = trimString(editable.title)
//     editable.excerpt = trimString(editable.excerpt)
//     editable.mainImageIndex = ensurePositiveInt(editable.mainImageIndex)
//     editable.tags = removeDuplicates(editable.tags)
//   },
//   createCalculated: () => ({ editedAt: Date.now() }),
// }
//
// export const postModel = createModel(formatSchema)
//
