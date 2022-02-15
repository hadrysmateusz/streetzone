import pick from "lodash/pick"

import { combineSchema } from "./helpers"
import {  KeyType, Schema } from "./types"

function getKeysOfType<DataType extends Record<string, any>>(
  schema: Record<keyof DataType, KeyType>,
  type: KeyType
) {
  return Object.entries(schema).reduce<(keyof DataType)[]>(
    (acc, [key, value]) => (value === type ? [...acc, key] : acc),
    []
  )
}

export const createModel = function <
  // formatter input types
  CreateInputType,
  EditInputType,
  // schema types
  DataType extends Record<string, any>,
  ReadonlyType,
  EditableType,
  CalculatedType
>(
  schemaOptions: Schema<
    DataType,
    ReadonlyType,
    EditableType,
    CalculatedType,
    CreateInputType
  >
) {
  const {
    schema, // TODO: rename this option
    formatEditable,
    createEditable,
    createCalculated,
    createReadonly,
    collectionName,
  } = schemaOptions

  const readonlyKeys = getKeysOfType(schema, KeyType.READONLY)
  const editableKeys = getKeysOfType(schema, KeyType.EDITABLE)

  return {
    readonlyKeys,
    editableKeys,
    collectionName: collectionName,
    formatForCreate: function (data: CreateInputType) {
      // create editable data based on input and defaults
      const editable = createEditable(data) as EditableType

      // format / sanitize / and otherwise ensure integrity
      formatEditable(editable)

      // create calculated values
      const calculated = createCalculated(editable)

      // create the readonly values
      const readonly = createReadonly(data)

      // put the entire object together
      return combineSchema({ readonly, editable, calculated }) as DataType
    },
    formatForEdit: function (prevData: DataType, inputData: EditInputType) {
      // merge previous and new data
      const merged: DataType = { ...prevData, ...inputData }

      // pick editable values from merged object
      const editable = pick(merged, editableKeys) as EditableType

      // format / sanitize / and otherwise ensure integrity
      formatEditable(editable)

      // create calculated values
      const calculated = createCalculated(editable)

      // pick the readonly values from prev data to prevent accidental overwrites
      const readonly = pick(prevData, readonlyKeys) as ReadonlyType

      // put the entire object together
      return combineSchema({ readonly, editable, calculated }) as DataType
    },
  }
}

// export function createEditFormatter<
//   DataType extends Record<string, any>,
//   InputType extends Partial<DataType>,
//   ReadonlyType extends Partial<DataType>,
//   EditableType extends Partial<DataType>,
//   CalculatedType extends Partial<DataType>
// >({
//   readonlyKeys,
//   editableKeys,
//   formatEditable,
//   createCalculated,
// }: Schema<
//   DataType,
//   InputType,
//   ReadonlyType,
//   EditableType,
//   CalculatedType
// >) {
//   return function editFormatter(prevData: DataType, mergeData: InputType) {
//     // pick the readonly values from prev data to prevent accidental overwrites
//     const readonly = pick(prevData, readonlyKeys) as ReadonlyType
//
//     // merge previous and new data
//     const merged: DataType = { ...prevData, ...mergeData }
//
//     // pick editable values from merged object
//     const editable = pick(merged, editableKeys) as EditableType
//
//     // format / sanitize / and otherwise ensure integrity
//     formatEditable(editable)
//
//     // create calculated values
//     const calculated = createCalculated(editable)
//
//     // put the entire object together
//     return combineSchema({ readonly, editable, calculated }) as DataType
//   }
// }
