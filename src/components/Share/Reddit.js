import React from "react"
import ShareButton from "./ShareButton"

const Reddit = (props) => {
	const tooltip = props.tooltip || "Udostępnij na Reddicie"
	const url = encodeURIComponent(props.url)
	const fullUrl = `https://reddit.com/submit/?url=${url}`

	return (
		<ShareButton
			variant="reddit"
			icon={["fab", "reddit-square"]}
			fullUrl={fullUrl}
			tooltip={tooltip}
			onClick={props.onClick}
		/>
	)
}

export default Reddit
