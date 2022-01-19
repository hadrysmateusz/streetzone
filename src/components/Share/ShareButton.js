import React from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ShareButtonLink = styled.a``

const ShareButton = ({ fullUrl, onClick, variant, icon, tooltip }) => (
	<ShareButtonLink
		href={fullUrl}
		target="_blank"
		rel="noopener noreferrer"
		onClick={onClick}
		variant={variant}
		title={tooltip}
	>
		<FontAwesomeIcon icon={icon} />
	</ShareButtonLink>
)

export default ShareButton
