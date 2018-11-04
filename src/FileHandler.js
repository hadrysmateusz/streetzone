import React, { Component } from "react"
import Button from "./components/Button"

export class FileHandler extends Component {
	fileInput = React.createRef()

	clickFileInput = () => {
		this.fileInput.current.click()
	}

	render() {
		return (
			<div>
				<input
					type="file"
					accept="image/*"
					style={{ display: "none" }}
					ref={this.fileInput}
					onChange={(e) => this.props.onChange(e.target.files)}
					multiple
				/>
				<Button type="button" onClick={this.clickFileInput}>
					Wybierz pliki
				</Button>
			</div>
		)
	}
}

export default FileHandler
