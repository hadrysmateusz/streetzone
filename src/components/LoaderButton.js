import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types"
import Button from "./Button"

const LoaderButton = ({
	isLoading = false,
	disabled = false,
	text = "OK",
	loadingText = text,
	...props
}) => (
	<Button disabled={disabled || isLoading} {...props}>
		{isLoading && <FontAwesomeIcon icon="spinner" />}
		<span>{!isLoading ? text : loadingText}</span>
	</Button>
)

LoaderButton.propTypes = {
	isLoading: PropTypes.bool,
	disabled: PropTypes.bool,
	text: PropTypes.string.isRequired,
	loadingText: PropTypes.string
}

export default LoaderButton
