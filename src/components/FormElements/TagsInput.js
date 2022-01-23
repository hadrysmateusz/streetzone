import { useState } from "react"

import { useFirebase, useFlash, useTagsOptions } from "../../hooks"

import { StyledSelect } from "./Dropdown.styles"
import FormElementContainer from "./FormElementContainer"

const TagsInput = ({
  onChange: setValue,
  placeholder = "Tagi (zatwierdzaj enterem)",
  value,
  info,
  error,
  disabled,
  ...rest
}) => {
  const firebase = useFirebase()
  const flashMessage = useFlash()
  const { options, isLoading } = useTagsOptions()
  const [isCreating, setIsCreating] = useState(false)

  const transformValue = (value) => {
    // only null resets the field so if a value
    // wasn't found set it to null to clear the field
    if (!value) {
      return null
    } else {
      return value.map((singleValue) => options.find((option) => option.value === singleValue))
    }
  }

  const onChange = (data, action) => {
    if (action.action === "clear") {
      setValue(undefined)
    } else {
      const value = data.map((dataObj) => dataObj.value)
      setValue(value)
    }
  }

  const onCreateOption = async (inputValue) => {
    try {
      // TODO: input sanitizing (strip slashes, dots, braces etc.)
      // the key can be different from the display value
      // the same process as for encoding can be used for decoding if the need arises
      // const key = inputValue.toLowerCase().replace(/\W/g, "")

      setIsCreating(true)

      await firebase.db.collection("tags").doc(inputValue).set({ name: inputValue })

      const newValue = value ? [...value, inputValue] : [inputValue]

      setValue(newValue)
    } catch (error) {
      console.error(error)
      flashMessage({
        type: "error",
        text: "Błąd",
        details: "Tag mógł nie zostać dodany, więcej informacji w konsoli",
      })
    }

    setIsCreating(false)
  }

  return (
    <FormElementContainer info={info} error={error}>
      <StyledSelect
        onCreateOption={onCreateOption}
        onChange={onChange}
        value={transformValue(value)}
        hasError={!!error}
        options={options}
        placeholder={placeholder}
        isMulti
        isSearchable
        isDisabled={disabled || isLoading}
        isLoading={isLoading || isCreating}
        // noOptionsMessage is a function that receives inputValue but I don't care about that
        noOptionsMessage={() => "Wpisz by dodać"}
        formatCreateLabel={(inputValue) => `Dodaj "${inputValue}"`}
        {...rest}
      />
    </FormElementContainer>
  )
}

export default TagsInput
