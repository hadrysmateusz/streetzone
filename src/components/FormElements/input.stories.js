import React from "react"
import { storiesOf } from "@storybook/react"
import Input from "./input"
import "../../index.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

storiesOf("Input", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Input />)
	.add("disabled", () => <Input disabled />)
	.add("placeholder", () => <Input placeholder="Placeholder" />)
	.add("disabled + placeholder", () => <Input disabled placeholder="Placeholder" />)
	.add("disabled + placeholder + icon", () => (
		<Input disabled placeholder="Placeholder" icon={faSearch} />
	))
	.add("icon", () => <Input icon={faSearch} />)
	.add("info", () => <Input info="Additional information" />)
	.add("error", () => <Input error="This field is required" />)
