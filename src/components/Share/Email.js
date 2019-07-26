import React from "react"
import ShareButton from "./ShareButton"

const Email = (props) => {
	const tooltip = props.tooltip || "Udostępnij E-mailem"
	const url = encodeURIComponent(props.url)
	const fullUrl = `mailto:?body=${url}`

	return (
		<ShareButton
			variant="email"
			icon="envelope"
			fullUrl={fullUrl}
			tooltip={tooltip}
			onClick={props.onClick}
		/>
	)
}

export default Email
