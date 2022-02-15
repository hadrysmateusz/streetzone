export {}

// import React, { useCallback, useState } from "react"
//
// import FormElementContainer from "./FormElementContainer"
// import { StyledCreatableSelect } from "./Dropdown.styles"
// import { DropdownOnChange, DropdownProps } from "./Dropdown"
//
// type MultiTextInputOptionValue = string
// type MultiTextInputOption = {
//   value: MultiTextInputOptionValue
//   label: string
// }
// type MultiTextInputProps = DropdownProps<
//   MultiTextInputOption,
//   MultiTextInputOptionValue
// > & {
//   remove: (option: MultiTextInputOption) => void
//   add: (inputValue: string) => void
// }
//
// export const MultiTextInputControlled: React.FC<MultiTextInputProps> = ({
//   info,
//   error,
//   placeholder,
//   isClearable,
//   disabled,
//   onChange,
//   value,
//   remove,
//   add,
//   ...rest
// }) => {
//   const [inputValue, setInputValue] = useState<string>("")
//
//   const handleChange = useCallback<DropdownOnChange<MultiTextInputOption>>(
//     (value, action) => {
//       if (action.action === "remove-value") {
//         remove(action.removedValue)
//       }
//       onChange(value, action)
//     },
//     [onChange, remove]
//   )
//
//   const handleInputChange = useCallback((inputValue: string) => {
//     setInputValue(inputValue)
//   }, [])
//
//   const handleKeyDown = useCallback(
//     (event) => {
//       if (!inputValue) return
//
//       switch (event.key) {
//         case "Enter":
//         case "Tab":
//           add(inputValue)
//           setInputValue("")
//
//           event.preventDefault()
//           break
//         default:
//           return
//       }
//     },
//     [add, inputValue]
//   )
//
//   return (
//     <FormElementContainer info={info} error={error}>
//       <StyledCreatableSelect
//         isMulti={true}
//         menuIsOpen={false}
//         onInputChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onChange={handleChange}
//         components={{
//           DropdownIndicator: null,
//         }}
//         inputValue={inputValue}
//         value={value}
//         hasError={!!error}
//         disabled={disabled}
//         placeholder={placeholder}
//         isClearable={isClearable}
//         {...rest}
//       />
//     </FormElementContainer>
//   )
// }
