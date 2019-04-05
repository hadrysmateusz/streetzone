import React from "react"
import { storiesOf } from "@storybook/react"
import FileItem from "./FileItem"

const commonProps = {
	id: 1,
	onDelete: (id) => console.log("delete " + id),
	previewUrl: "  https://picsum.photos/250/250/?random"
}

storiesOf("FileItem", module)
	.addDecorator((storyFn) => (
		<div style={{ margin: "40px", width: "150px" }}>{storyFn()}</div>
	))
	.add("basic", () => <FileItem {...commonProps} />)
	.add("error", () => <FileItem {...commonProps} error="Some error" />)
