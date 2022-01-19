import React from "react"
import ShareButton from "./ShareButton"

const Facebook = (props) => {
	const tooltip = props.tooltip || "Udostępnij na Facebooku"
	const url = encodeURIComponent(props.url)
	const fullUrl = `https://facebook.com/sharer/sharer.php?u=${url}`

	return (
		<ShareButton
			variant="facebook"
			icon={["fab", "facebook-square"]}
			fullUrl={fullUrl}
			tooltip={tooltip}
			onClick={props.onClick}
		/>
	)
}

export default Facebook
