import React, { Component } from "react"

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
				<button type="button" onClick={this.clickFileInput}>
					Select files
				</button>
			</div>
		)
	}
}

export default FileHandler
