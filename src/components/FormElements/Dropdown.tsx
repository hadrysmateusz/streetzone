import React from "react"
import CreatableSelect from "react-select/creatable"
import { ActionMeta, GroupBase, OnChangeValue, Props } from "react-select"

import FormElementContainer from "./HelperComponents/FormElementContainer"
import { CreatableSelectStylesWrapper } from "./Dropdown.styles"
import { ErrorAndInfoProps } from "../FinalFormFields/types"

export type SelectOption<OptionValue> = {
  value: OptionValue
  label: string
}

type DropdownOptionValue = string
export type DropdownOption = SelectOption<DropdownOptionValue>

export type DropdownOnChange<
  Option = DropdownOption,
  IsMulti extends boolean = false
> = (value: OnChangeValue<Option, IsMulti>, action: ActionMeta<Option>) => void

export interface DropdownProps<
  Option = DropdownOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group>,
    ErrorAndInfoProps {
  placeholder?: string
  disabled?: boolean
}

function Dropdown<
  Option = DropdownOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: DropdownProps<Option, IsMulti, Group>) {
  const {
    info,
    error,
    noOptionsMessage = () => "Brak opcji",
    placeholder = "Wybierz",
    disabled,
    ...rest
  } = props

  return (
    <FormElementContainer info={info} error={error}>
      <CreatableSelectStylesWrapper hasError={!!error}>
        <CreatableSelect
          classNamePrefix="react-select"
          isDisabled={disabled ?? props.isDisabled}
          placeholder={placeholder}
          noOptionsMessage={noOptionsMessage}
          {...rest}
        />
      </CreatableSelectStylesWrapper>
    </FormElementContainer>
  )
}

export default Dropdown

// /**
//  * Based on FieldInputProps from react-final-form
//  */
// export type FinalFormInputProps<
//   FieldValue,
//   T extends HTMLElement = HTMLElement
// > = {
//   name: string
//   onBlur: (event?: React.FocusEvent<T>) => void
//   onChange: (event: React.ChangeEvent<T> | any) => void
//   onFocus: (event?: React.FocusEvent<T>) => void
//   type?: string
//   value: FieldValue
//   checked?: boolean
//   multiple?: boolean
// }

// /**
//  * Props to be passed to underlying ReactSelect component
//  */
// export type DropdownReactSelectProps<Option> = {
//   onChange: DropdownOnChange<Option>
//   value: Option[]
//   noOptionsMessage: (inputValue: string) => string
//   options: Option[]
//   isClearable?: boolean
//   isSearchable?: boolean
//   isMulti?: boolean
// }
