import { useField } from "react-final-form"

import { FieldLabel, Section } from "../Common.styles"

export const withFormFieldWrapper = (C) => (props) => {
  let { label, showLabel = true, placeholder, name, ...rest } = props

  if (showLabel && !label && process.env.NODE_ENV === "development") {
    console.warn(
      "A form field is missing a label. If you don't want to use a label for this field, give it showLabel={false}"
    )
  }

  // show label if it's provided and not intentionally hidden
  showLabel = !!label && showLabel !== false
  // if placeholder is not provided it defaults to the same value as label
  // if set to null, no placeholder will be shown
  placeholder =
    props.placeholder !== undefined ? props.placeholder : props.label

  return (
    <Section>
      {showLabel && <FieldLabel>{props.label}</FieldLabel>}
      <C placeholder={placeholder} {...rest} />
    </Section>
  )
}

export const useFinalFormFieldAdapter = (name) => {
  const { input, meta } = useField(name)
  const error = getFormError(meta)
  return { ...input, error }
}

export const getFormError = (meta) => {
  return meta.error && meta.touched ? meta.error : null
}

// export const withFinalFormFieldAdapter = (C) => (props) => {
//   const finalFormAdapterProps = useFinalFormFieldAdapter(props.name)
//   return <C {...props} {...finalFormAdapterProps} />
// }

// export const withFinalFormWrapper = (C) => (props) => {
// 	let { label, showLabel = true, placeholder, name, ...rest } = props

// 	if (showLabel && !label && process.env.NODE_ENV === "development") {
// 		console.warn(
// 			"A final form field is missing a label. If you don't want to use a label for this field, give it showLabel={false}"
// 		)
// 	}

// 	// show label if it's provided and not intentionally hidden
// 	showLabel = !!label && showLabel !== false
// 	// if placeholder is not provided it defaults to the same value as label
// 	// if set to null, no placeholder will be shown
// 	placeholder = props.placeholder !== undefined ? props.placeholder : props.label

// 	return (
// 		<Section>
// 			{showLabel && <FieldLabel>{props.label}</FieldLabel>}
// 			<Field name={props.name}>
// 				{({ input, meta }) => {
// 					return <C {...input} placeholder={placeholder} error={getFormError(meta)} {...rest} />
// 				}}
// 			</Field>
// 		</Section>
// 	)
// }
