import React from "react"
import styled from "styled-components/macro"

const PageHeadingContainer = styled.div`
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	margin: 0 0 var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: var(--spacing3) 0 var(--spacing4);
	}
`

// TODO: make the emoji properly accessible
const PageHeading = ({ emoji, children, ariaLabel = "" }) => {
	return (
		<PageHeadingContainer>
			<span role="img" aria-label={ariaLabel}>
				{emoji}
			</span>
			<span>
				&nbsp;
				{children}
			</span>
		</PageHeadingContainer>
	)
}

export default PageHeading
