import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import FileItem from "./FileItem"

const commonProps = {
	id: 1,
	onDelete: action("delete"),
	onSetMain: action("set-main"),
	previewUrl: "  https://picsum.photos/250/250/?random"
}

storiesOf("FileItem", module)
	.addDecorator((storyFn) => (
		<div style={{ margin: "40px", width: "150px" }}>{storyFn()}</div>
	))
	.add("basic", () => <FileItem {...commonProps} />)
	.add("error", () => <FileItem {...commonProps} error="Some error" />)
