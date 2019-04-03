import React from "react"
import { storiesOf } from "@storybook/react"
import FileHandler from "./new"

storiesOf("FileHandler", module)
	.addDecorator((storyFn) => <div style={{ margin: "40px" }}>{storyFn()}</div>)
	.add("basic", () => <FileHandler />)
