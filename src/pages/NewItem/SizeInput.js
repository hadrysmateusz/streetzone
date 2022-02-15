import { useForm, useFormState } from "react-final-form"
import { ITEM_SCHEMA } from "../../constants"
import { OnChange } from "react-final-form-listeners"
import {
  DropdownFFComponent,
  useFieldWithError,
} from "../../components/FinalFormFields"

export const SizeInput = ({ name }) => {
  const { values } = useFormState()
  const form = useForm()

  const { error, input } = useFieldWithError(name, { type: "select" })

  const options = ITEM_SCHEMA.sizeOptions(values.category)

  return (
    <>
      <OnChange name="category">
        {(value, previous) => {
          if (value !== previous) {
            // prevent leaving focus on a disabled field
            form.blur("size")
            // reset the field
            input.onChange(undefined)
          }
        }}
      </OnChange>
      <DropdownFFComponent
        {...input}
        options={options}
        isMulti={false}
        isSearchable={false}
        disabled={
          !values.category ||
          values.category === ITEM_SCHEMA.categories.akcesoria
        }
        placeholder="Rozmiar"
        error={error}
        info="Dostępne rozmiary zależne są od wybranej kategorii"
      />
    </>
  )
}
