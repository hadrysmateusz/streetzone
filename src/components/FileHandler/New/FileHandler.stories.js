import React from "react"
import { storiesOf } from "@storybook/react"
import { Form, Field } from "react-final-form"
import FileHandler from "./FileHandler"

const ControlledHandler = () => {
	return (
		<Form
			onSubmit={() => console.log("submit")}
			initialValues={{ files: [] }}
			render={({ handleSubmit, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="files" component={FileHandler} />

						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

storiesOf("FileHandler", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <ControlledHandler />)
	.add("error", () => <ControlledHandler error="Some error" />)
