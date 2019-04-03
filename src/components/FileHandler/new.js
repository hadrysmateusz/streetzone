import React from "react"
import { FormElementContainer } from "../FormElements"
import PropTypes from "prop-types"

const FileHandler = ({ info, error, disabled, ...rest }) => {
	return (
		<FormElementContainer error={error} info={info}>
			{/* <Dropzone onDrop={this.onDrop} /> */}
		</FormElementContainer>
	)
}

FileHandler.propTypes = {
	info: PropTypes.string,
	error: PropTypes.string,
	disabled: PropTypes.bool
}

export default FileHandler
