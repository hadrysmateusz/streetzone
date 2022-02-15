export {}

// import { SimpleFFWrapper } from "./HelperComponents"
// import { useFieldWithError } from "./Helpers"
// import { MultiTextInputControlled } from "../FormElements"
//
// export const MultiTextInputFF = ({ label, ...rest }) => {
//   return (
//     <SimpleFFWrapper label={label}>
//       <MultiTextInputFFUnwrapped {...rest} />
//     </SimpleFFWrapper>
//   )
// }
//
// export const MultiTextInputFFUnwrapped = ({
//   label,
//   name,
//   placeholder,
//   info,
// }) => {
//   const { input, error } = useFieldWithError(name, { type: "select" })
//
//   return (
//     <SimpleFFWrapper label={label}>
//       <MultiTextInputFFComponent
//         {...input}
//         placeholder={placeholder}
//         error={error}
//         info={info}
//       />
//     </SimpleFFWrapper>
//   )
// }
//
// const MultiTextInputFFComponent = ({ onChange, value, ...rest }) => {
//   const add = (newTag) => {
//     if (!newTag) {
//       onChange(undefined)
//     } else {
//       if (value) {
//         value = [...value, newTag]
//       } else {
//         value = [newTag]
//       }
//       onChange(value)
//     }
//   }
//
//   const remove = (removedValue) => {
//     value = value.filter((a) => a !== removedValue.value)
//     onChange(value)
//   }
//
//   // convert any string value to React Select option object
//   let formattedValue
//   if (value) {
//     formattedValue = value.map((a) => {
//       return {
//         value: a,
//         label: a,
//       }
//     })
//   }
//
//   return (
//     <MultiTextInputControlled
//       {...rest}
//       value={formattedValue}
//       add={add}
//       remove={remove}
//     />
//   )
// }
