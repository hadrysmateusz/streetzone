import React, { useCallback, useState } from "react"

import { useFirebase, useFlash, useTagsOptions } from "../../hooks"
import { TagOption, TagOptionValue } from "../../hooks/useTagsOptions"

import { StyledCreatableSelect } from "./Dropdown.styles"
import FormElementContainer from "./HelperComponents/FormElementContainer"

export type FieldValue = TagOptionValue[]

// type TagsInputProps = DropdownProps<TagOption, TagOptionValue> & {}

const TagsInput: React.FC<any> = ({
  onChange: setValue,
  placeholder = "Tagi (zatwierdzaj enterem)",
  value,
  info,
  error,
  disabled = false,
  isClearable,
  ...rest
}) => {
  const firebase = useFirebase()
  const flashMessage = useFlash()
  const { options, isLoading } = useTagsOptions()
  const [isCreating, setIsCreating] = useState(false)

  const transformValue = useCallback(
    (value: FieldValue) => {
      // only null resets the field so if a value
      // wasn't found set it to null to clear the field
      return !value
        ? null
        : value.map((singleValue) =>
            options.find((option) => option.value === singleValue)
          )
    },
    [options]
  )

  const onChange = useCallback(
    (data, action) => {
      if (action.action === "clear") {
        setValue([])
      } else {
        const value = data.map((dataObj: TagOption) => dataObj.value)
        setValue(value)
      }
    },
    [setValue]
  )

  const onCreateOption = useCallback(
    (inputValue: string) => {
      try {
        // TODO: input sanitizing (strip slashes, dots, braces etc.)
        // the key can be different from the display value
        // the same process as for encoding can be used for decoding if the need arises
        // const key = inputValue.toLowerCase().replace(/\W/g, "")

        setIsCreating(true)

        firebase.db.collection("tags").doc(inputValue).set({ name: inputValue })

        const newValue = value ? [...value, inputValue] : [inputValue]

        setValue(newValue)
      } catch (error) {
        console.error(error)
        flashMessage(ERROR_MESSAGE)
      }

      setIsCreating(false)
    },
    [firebase.db, flashMessage, setValue, value]
  )

  return (
    <FormElementContainer info={info} error={error}>
      <StyledCreatableSelect
        onCreateOption={onCreateOption}
        onChange={onChange}
        value={transformValue(value)}
        hasError={!!error}
        options={options}
        placeholder={placeholder}
        isMulti={true}
        isSearchable={true}
        isClearable={isClearable}
        isDisabled={disabled || isLoading}
        isLoading={isLoading || isCreating}
        // noOptionsMessage is a function that receives inputValue, but I don't care about that
        noOptionsMessage={() => "Wpisz by dodać"}
        formatCreateLabel={(inputValue: TagOptionValue) =>
          `Dodaj "${inputValue}"`
        }
        {...rest}
      />
    </FormElementContainer>
  )
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Błąd",
  details: "Tag mógł nie zostać dodany, więcej informacji w konsoli",
} as const

export default TagsInput
