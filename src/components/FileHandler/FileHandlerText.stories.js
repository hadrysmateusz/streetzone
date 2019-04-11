import React from "react"
import { storiesOf } from "@storybook/react"
import { Form, Field } from "react-final-form"
import FileHandlerText from "./FileHandlerText"
import { action } from "@storybook/addon-actions"
import Button, { ButtonContainer } from "../Button"

const ControlledHandler = ({ ...props }) => {
	return (
		<Form
			onSubmit={action("submit")}
			render={({ handleSubmit }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="file">
							{({ input, meta }) => {
								return <FileHandlerText {...input} {...props} />
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

storiesOf("FileHandlerText", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("default", () => <ControlledHandler />)
