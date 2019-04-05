import React from "react"
import { storiesOf } from "@storybook/react"
import { MultiTextInput } from "./multiTextInput"
import "../../index.css"

storiesOf("MultiTextInput", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <MultiTextInput />)
	.add("disabled", () => <MultiTextInput disabled />)
	.add("info", () => <MultiTextInput info="Additional info" />)
	.add("error", () => <MultiTextInput error="Error message" />)
	.add("custom placeholder", () => (
		<MultiTextInput placeholder="Custom Placeholder Text" />
	))
