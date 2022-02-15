import { Deal } from "./Deal"
import { Drop } from "./Drop"
import { Post } from "./Post"
import { Item } from "./Item"
import { User } from "./User"

export enum KeyType {
  READONLY = "readonly",
  EDITABLE = "editable",
  CALCULATED = "calculated",
}

// TODO: move this type to better place
export type FirestoreCollectionNames =
  | "deals"
  | "designers"
  | "drops"
  | "followedDrops"
  | "items"
  | "posts"
  | "rooms"
  | "users"

/**
 * FirestoreCollectionNames which have corresponding schemas and models
 */
export enum ModelledFirestoreCollectionNames {
  deals = "deals",
  drops = "drops",
  items = "items",
  posts = "posts",
  users = "users",
}
// export type ModelledFirestoreCollectionNames = Extract<
//   FirestoreCollectionNames,
//   "deals" | "drops" | "items" | "posts" | "users"
// >

export type FirestoreCollectionDataTypes = {
  [ModelledFirestoreCollectionNames.deals]: Deal
  [ModelledFirestoreCollectionNames.drops]: Drop
  [ModelledFirestoreCollectionNames.items]: Item
  [ModelledFirestoreCollectionNames.posts]: Post
  [ModelledFirestoreCollectionNames.users]: User
}

export type Schema<
  DataType extends Record<string, any>,
  ReadonlyType,
  EditableType,
  CalculatedType,
  CreateInputType
> = {
  collectionName: ModelledFirestoreCollectionNames
  schema: Record<keyof DataType, KeyType>
  // editableDefaults: Omit<EditableType,keyof CreateInputType>
  /**
   * Function to create editable fields in formatForCreate method
   * @param input CreateInputType object passed into the formatForCreate method
   */
  createEditable: (input: CreateInputType) => EditableType
  /**
   * Function to create readonly fields in formatForCreate method
   * @param input CreateInputType object passed into the formatForCreate method
   */
  createReadonly: (input: CreateInputType) => ReadonlyType
  /**
   * Function to modify in place the mergedData object in both formatForCreate and formatForEdit
   * @param editable DataType object with merged in values from InputType
   */
  formatEditable: (editable: EditableType) => void
  /**
   * Function to create the calculated fields in both formatForCreate and formatForEdit
   * @param editable DataType object with merged in values from InputType
   */
  createCalculated: (editable: EditableType) => CalculatedType
}

export type Model<
  DataType extends Record<string, any>,
  CreateInputType,
  EditInputType
> = {
  collectionName: ModelledFirestoreCollectionNames
  formatForCreate: (data: CreateInputType) => DataType
  formatForEdit: (prevData: DataType, inputData: EditInputType) => DataType
}
