import React from "react"
import { storiesOf } from "@storybook/react"
import Input from "./input"
import "../../index.css"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

storiesOf("Input", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Input placeholder="Placeholder" />)
	.add("disabled", () => <Input placeholder="Placeholder" disabled />)
	.add("info", () => <Input placeholder="Placeholder" info="Additional information" />)
	.add("error", () => <Input placeholder="Placeholder" error="Error message" />)

	.add("icon", () => <Input placeholder="Placeholder" icon={faSearch} />)
	.add("disabled + icon", () => (
		<Input placeholder="Placeholder" disabled icon={faSearch} />
	))
