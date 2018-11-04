import React, { Component } from "react"

export class File extends Component {
	render() {
		return (
			<li key={this.props.fileItem.id}>
				<img src={this.props.fileItem.previewUrl} height={120} alt="" />
				<button
					type="button"
					onClick={() => this.props.onDelete(this.props.fileItem.id)}
				>
					X
				</button>
			</li>
		)
	}
}

export default File
