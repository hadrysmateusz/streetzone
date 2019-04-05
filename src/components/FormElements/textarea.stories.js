import React from "react"
import { storiesOf } from "@storybook/react"
import Textarea from "./textarea"
import "../../index.css"

storiesOf("Textarea", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Textarea placeholder="Placeholder" />)
	.add("disabled", () => <Textarea placeholder="Placeholder" disabled />)
	.add("info", () => <Textarea placeholder="Placeholder" info="Additional information" />)
	.add("error", () => <Textarea placeholder="Placeholder" error="Error message" />)
