import React from "react"
import { storiesOf } from "@storybook/react"
import Dropdown from "./dropdown"
import "../../index.css"

import { conditionOptions as options } from "../../constants/item_schema"

storiesOf("Dropdown", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <Dropdown options={options} />)
	.add("multi", () => <Dropdown options={options} isMulti />)
	.add("w/ default", () => <Dropdown options={options} defaultValue={options[0]} />)
	.add("custom placeholder", () => (
		<Dropdown options={options} placeholder="Custom Placeholder Text :)" />
	))
	.add("disabled", () => <Dropdown options={options} disabled />)
	.add("info", () => <Dropdown options={options} info="Additional info" />)
	.add("error", () => <Dropdown options={options} error="This field is required" />)
