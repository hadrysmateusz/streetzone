import React from "react"
import { storiesOf } from "@storybook/react"
import { Form, Field } from "react-final-form"
import FileHandler from "./FileHandler"
import { action } from "@storybook/addon-actions"
import Button, { ButtonContainer } from "../../Button"

const items = [
	{
		id: 1,
		previewUrl: "https://picsum.photos/250/250/"
	},
	{
		id: 2,
		previewUrl: "https://picsum.photos/300/250/"
	},
	{
		id: 3,
		previewUrl: "https://picsum.photos/250/300/"
	}
]

const ControlledHandler = ({ items = [], error }) => {
	return (
		<Form
			onSubmit={action("submit")}
			initialValues={{ files: items }}
			render={({ handleSubmit, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="files" component={FileHandler} error={error} />
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
