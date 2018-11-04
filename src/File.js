import React, { Component } from "react"
// import { s3Get } from "./libs/s3lib"

export class File extends Component {
	// componentDidMount = async () => {
	// 	const { fileKey, userId } = this.props
	// 	const url = s3Get(fileKey, userId)
	// 	this.setState({ url })
	// }

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
