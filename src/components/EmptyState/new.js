import React from "react"
import styled from "styled-components/macro"

const EmptyStateContainer = styled.div`
	max-height: 60vh;

	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;

	.header {
		font-size: var(--fs-s);
		color: var(--black100);
		font-weight: var(--semi-bold);
		margin-bottom: var(--spacing3);
	}

	.content {
		font-size: var(--fs-xs);
		color: var(--gray25);
		font-weight: normal;
		margin-bottom: var(--spacing3);
		> * + * {
			margin-top: var(--spacing3);
		}
	}
`

const EmptyState = ({ header, children }) => {
	return (
		<EmptyStateContainer>
			<div className="header">{header}</div>
			<div className="content">{children}</div>
		</EmptyStateContainer>
	)
}

export default EmptyState
