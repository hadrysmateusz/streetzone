import React from "react"
import { storiesOf } from "@storybook/react"
import { Form, Field } from "react-final-form"
import FileHandler from "./FileHandler"
import { action } from "@storybook/addon-actions"
import Button, { ButtonContainer } from "../../Button"

const items = [
	{
		id: "id1",
		previewUrl: "https://picsum.photos/250/250/"
	},
	{
		id: "id2",
		previewUrl: "https://picsum.photos/300/250/",
		error: "Mocked error"
	},
	{
		id: "id3",
		previewUrl: "https://picsum.photos/250/300/"
	}
]

const validate = ({ files }) => {
	const errors = {}

	errors.files = (() => {
		let main
		let specific = {}

		// Attachment too big
		files.forEach((file) => {
			const fileId = file.id

			if (file.error) {
				specific[fileId] = file.error
			}
		})

		let errObj = { main, specific }
		return errObj
	})()

	return errors
}

const ControlledHandler = ({ items = [], ...props }) => {
	return (
		<Form
			onSubmit={action("submit")}
			validate={validate}
			initialValues={{ files: items }}
			render={({ form, handleSubmit, submitting, pristine, values }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="files">
							{({ input, meta }) => {
								const itemErrors = meta.error ? meta.error.specific : null
								return <FileHandler {...input} itemErrors={itemErrors} {...props} />
							}}
						</Field>
						<ButtonContainer>
							<Button primary type="submit">
								Submit
							</Button>
						</ButtonContainer>
					</form>
				)
			}}
		/>
	)
}

storiesOf("FileHandler", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("empty", () => <ControlledHandler />)
	.add("with items", () => <ControlledHandler items={items} />)
	.add("error", () => <ControlledHandler error="Some error" />)
