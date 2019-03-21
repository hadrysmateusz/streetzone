import React from "react"
import { storiesOf } from "@storybook/react"
import Textarea from "./textarea"
import "../../index.css"

storiesOf("Textarea", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Textarea />)
	.add("disabled", () => <Textarea disabled />)
	.add("placeholder", () => <Textarea placeholder="Placeholder" />)
	.add("disabled + placeholder", () => <Textarea disabled placeholder="Placeholder" />)
	.add("info", () => <Textarea info="Additional information" />)
	.add("error", () => <Textarea error="This field is required" />)
