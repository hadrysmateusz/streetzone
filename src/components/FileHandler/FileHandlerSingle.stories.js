import React from "react"
import { storiesOf } from "@storybook/react"
import { Form, Field } from "react-final-form"
import FileHandlerSingle from "./FileHandlerSingle"
import { action } from "@storybook/addon-actions"
import Button, { ButtonContainer } from "../Button"
import { css } from "styled-components/macro"

const item = {
	id: "id1",
	previewUrl: "https://picsum.photos/800/800/"
}

const ControlledHandler = ({ item, ...props }) => {
	return (
		<Form
			onSubmit={action("submit")}
			initialValues={{ file: item }}
			render={({ handleSubmit }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="file">
							{({ input, meta }) => {
								return <FileHandlerSingle {...input} {...props} />
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

const roundStyles = css`
	border-radius: 50%;
	width: 180px;
	height: 180px;
`

const landscapeStyles = css`
	width: 800px;
	height: 450px;
`

storiesOf("FileHandlerSingle", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("default", () => <ControlledHandler />)
	.add("landscape", () => (
		<ControlledHandler item={item} containerStyles={landscapeStyles} />
	))
	.add("landscape + error", () => (
		<ControlledHandler item={item} containerStyles={landscapeStyles} error="Some error" />
	))
	.add("round", () => <ControlledHandler item={item} containerStyles={roundStyles} />)
	.add("round + error", () => (
		<ControlledHandler item={item} containerStyles={roundStyles} error="Some error" />
	))
