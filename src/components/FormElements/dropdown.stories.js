import React from "react"
import { storiesOf } from "@storybook/react"
import Dropdown from "./dropdown"
import "../../index.css"

import options from "./dropdown_options"

storiesOf("Dropdown", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Dropdown options={options} />)
	.add("disabled", () => <Dropdown options={options} disabled />)
	.add("info", () => <Dropdown options={options} info="Additional info" />)
	.add("error", () => <Dropdown options={options} error="Error message" />)
	.add("custom placeholder", () => (
		<Dropdown options={options} placeholder="Custom Placeholder Text" />
	))
	.add("w/ default", () => <Dropdown options={options} defaultValue={options[0]} />)
	.add("multi", () => <Dropdown options={options} isMulti />)
