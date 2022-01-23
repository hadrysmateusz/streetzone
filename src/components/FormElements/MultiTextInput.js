import { useCallback, useState } from "react"

import FormElementContainer from "./FormElementContainer"
import { StyledCreatableSelect } from "./MultiTextInput.styles"

const components = {
  DropdownIndicator: null,
}

const createOption = (label) => {
  return {
    label,
    value: label,
  }
}

export const MultiTextInput = ({ info, error, disabled, ...rest }) => {
  const [inputValue, setInputValue] = useState("")
  const [value, setValue] = useState([])

  const handleChange = useCallback((value, _action) => {
    setValue(value)
  }, [])

  const handleInputChange = useCallback((inputValue) => {
    setInputValue(inputValue)
  }, [])

  const handleKeyDown = useCallback(
    (event) => {
      if (!inputValue) return

      switch (event.key) {
        case "Enter":
        case "Tab":
          setInputValue("")
          setValue((prevValue) => [...prevValue, createOption(inputValue)])

          event.preventDefault()
          break
        default:
          return
      }
    },
    [inputValue]
  )

  return (
    <FormElementContainer info={info} error={error}>
      <StyledCreatableSelect
        components={components}
        inputValue={inputValue}
        value={value}
        isMulti
        menuIsOpen={false}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </FormElementContainer>
  )
}

export const MultiTextInputControlled = ({
  remove,
  add,
  info,
  error,
  disabled,
  value,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("")

  const handleChange = useCallback(
    (_value, action) => {
      if (action.action === "remove-value") {
        remove(action.removedValue)
      }
    },
    [remove]
  )

  const handleInputChange = useCallback((inputValue) => {
    setInputValue(inputValue)
  }, [])

  const handleKeyDown = useCallback(
    (event) => {
      if (!inputValue) return

      switch (event.key) {
        case "Enter":
        case "Tab":
          add(inputValue)
          setInputValue("")

          event.preventDefault()
          break
        default:
          return
      }
    },
    [add, inputValue]
  )

  return (
    <FormElementContainer info={info} error={error}>
      <StyledCreatableSelect
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        components={components}
        inputValue={inputValue}
        isMulti={true}
        menuIsOpen={false}
        disabled={disabled}
        placeholder={placeholder}
      />
    </FormElementContainer>
  )
}
