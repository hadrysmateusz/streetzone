import { Field } from "react-final-form"

import { Dropdown } from "../FormElements"

import { Section } from "./Common.styles"

export const DropdownFF = ({
  label,
  name,
  placeholder,
  options,
  isSearchable,
  isClearable,
  isMulti,
  info,
}) => (
  <Section>
    <div className="header">{label}</div>
    <Field name={name} type="select">
      {({ input, meta }) => {
        const error = meta.error && meta.touched ? meta.error : null
        return (
          <DropdownFinalform
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
      }}
    </Field>
  </Section>
)

export const DropdownFinalform = ({ onChange: setValue, value, options, isMulti, ...rest }) => {
  // only null resets the field so if a value
  // wasn't found set it to null to clear the field
  if (!value) {
    value = null
  } else {
    // Find the matching value based on the isMulti prop
    // and possible values in the options prop
    if (isMulti) {
      value = value.map((singleValue) => options.find((option) => option.value === singleValue))
    } else {
      value = options.find((option) => option.value === value)
    }
  }

  const onChange = (data, action) => {
    if (action.action === "clear") {
      setValue(undefined)
    } else {
      const value = isMulti ? data.map((dataObj) => dataObj.value) : data.value
      setValue(value)
    }
  }

  return (
    <Dropdown {...rest} value={value} options={options} isMulti={isMulti} onChange={onChange} />
  )
}
