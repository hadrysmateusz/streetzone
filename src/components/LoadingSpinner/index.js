import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { Box } from "rebass"

import { CSS } from "../../constants"

const LoadingSpinnerUnstyled = (props) => (
	<Box {...props}>
		<FontAwesomeIcon icon="spinner" className="spinner" />
	</Box>
)

const LoadingSpinner = styled(LoadingSpinnerUnstyled)`
	width: ${(props) => props.width || "100%"};
	height: ${(props) => props.height || "100%"};

	${(props) => !props.inline && "font-size: 3rem"};

	color: ${CSS.COLOR_BLACK};
	display: flex;
	justify-content: center;
	align-items: center;

	.spinner {
		animation: ${CSS.KEYFRAMES_SPIN} 1.3s linear infinite;
	}
`

export default LoadingSpinner
