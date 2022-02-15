import React, { useMemo } from "react"
import { GroupBase, OptionsOrGroups } from "react-select"
import { Dropdown } from "../FormElements"

import { useFieldWithError } from "./Helpers"
import { SimpleFFWrapper } from "./HelperComponents"
import { CommonFieldProps, CommonUnwrappedFieldProps } from "./types";
import {
  DropdownOnChange,
  DropdownOption,
  DropdownProps,
} from "../FormElements/Dropdown"

type DropdownFFBaseProps<IsMulti extends boolean> = DropdownProps<
  DropdownOption,
  IsMulti
>
type DropdownFFProps<IsMulti extends boolean> = CommonUnwrappedFieldProps &
  DropdownFFBaseProps<IsMulti>
type DropdownFFWrappedProps<IsMulti extends boolean> = CommonFieldProps &
  DropdownFFBaseProps<IsMulti>

export function DropdownFF<IsMulti extends boolean>(
  {
    label,
    ...rest
  }:    DropdownFFWrappedProps<IsMulti>
) {
  return (
    <SimpleFFWrapper label={label}>
      <DropdownFFUnwrapped {...rest} />
    </SimpleFFWrapper>
  )
}

// TODO: set consistent defaults for all isSomething props
export function DropdownFFUnwrapped<IsMulti extends boolean, >({
  name,
  info,
  placeholder,
  options,
  isSearchable,
  isClearable,
  isMulti,
}: DropdownFFProps<IsMulti>) {
  const { error, input } = useFieldWithError<IsMulti extends true? string[] : string>(name, {
    type: "select",
    multiple: isMulti,
  })

  console.log(`dropdown ${name}:`, input)

  return (
    <DropdownFFComponent
      {...input}
      options={options}
      placeholder={placeholder}
      error={error}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isMulti={isMulti}
      info={info}
    />
  )
}

const isSingleOption = (
  optionOrGroup: DropdownOption | GroupBase<DropdownOption>
): optionOrGroup is DropdownOption => {
  // Group has an options field, which can be used to determine which the arg is
  return !("options" in optionOrGroup)
}

export function DropdownFFComponent<IsMulti extends boolean>({
  onChange: setValue,
  value,
  options,
  isMulti,
  ...rest
}: Omit<DropdownFFProps<IsMulti>, "name" | "value" | "onChange"> & {
  value: (IsMulti extends true ? string[] : string) | undefined
  onChange: (
    value: (IsMulti extends true ? string[] : string) | undefined
  ) => void
}) {
  // TODO: these types are flimsy, make them more reliable
  const convertedValue = useMemo(() => {
    // only null resets the field so if a value
    // wasn't found (or no options are available) set it to null to clear the field
    if (!value || !options) {
      return null
    }

    const findCorrectOption = (
      options: OptionsOrGroups<DropdownOption, GroupBase<DropdownOption>>,
      value: string
    ) => {
      return options.find((option) => {
        if (!isSingleOption(option)) {
          // TODO: support option groups
          throw new Error(
            "Option in Dropdown options array was a group. Groups are not yet supported."
          )
        }
        return option.value === value
      })
    }

    if (Array.isArray(value)) {
      if (isMulti !== true) {
        throw new Error(
          "Dropdown received an array as value, but isMulti is not true."
        )
      }
      return value.map((singleValue) => findCorrectOption(options, singleValue))
    } else {
      if (isMulti !== false) {
        throw new Error(
          "Dropdown received a string as value, but isMulti is true."
        )
      }
      return findCorrectOption(options, value)
    }
  }, [isMulti, options, value])

  const onChange: DropdownOnChange<DropdownOption, IsMulti> = (
    data,
    action
  ) => {
    if (action.action === "clear") {
      setValue(undefined)
      return
    }

    if (!data) {
      setValue(undefined)
      return
    }

    // TODO: these types are flimsy, make them more reliable
    if (isMulti === true) {
      if (Array.isArray(data)) {
        setValue(data.map((dataObj) => dataObj.value) as any)
        return
      }
    } else {
      if (!Array.isArray(data) && "value" in data) {
        setValue(data.value as any)
        return
      }
    }

    throw new Error("Invalid scenario in Dropdown onChange handler")
  }

  return (
    <Dropdown
      {...rest}
      value={convertedValue as any}
      options={options}
      isMulti={isMulti}
      onChange={onChange}
    />
  )
}
