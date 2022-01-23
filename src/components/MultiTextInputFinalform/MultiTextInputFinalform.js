import { MultiTextInputControlled } from "../FormElements"

const MultiTextInputFinalform = ({ onChange, value, ...rest }) => {
  const add = (newTag) => {
    if (!newTag) {
      onChange(undefined)
    } else {
      if (value) {
        value = [...value, newTag]
      } else {
        value = [newTag]
      }
      onChange(value)
    }
  }

  const remove = (removedValue) => {
    value = value.filter((a) => a !== removedValue.value)
    onChange(value)
  }

  // convert any string value to React Select option object
  let formattedValue
  if (value) {
    formattedValue = value.map((a) => {
      return {
        value: a,
        label: a,
      }
    })
  }

  return <MultiTextInputControlled {...rest} value={formattedValue} add={add} remove={remove} />
}

export default MultiTextInputFinalform
