import React from "react"
import styled from "styled-components/macro"

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	font-size: var(--fs-m);
	font-weight: bold;
	margin: var(--spacing3) 0;

	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		margin: var(--spacing4) 0;
	}

	.count {
		color: var(--gray0);
		margin-left: var(--spacing2);
	}
`

const EmptyStateContainer = styled.div`
	height: 400px;
	max-height: 60vh;

	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;

	color: var(--gray25);

	.header {
		color: var(--black100);
		font-weight: var(--semi-bold);
		margin-bottom: var(--spacing3);
	}

	.content {
		font-size: var(--fs-xs);
		margin-bottom: var(--spacing3);
		> * + * {
			margin-top: var(--spacing3);
		}
	}
`

export const EmptyState = ({ header, children }) => {
	return (
		<EmptyStateContainer>
			<div className="header">{header}</div>
			<div className="content">{children}</div>
		</EmptyStateContainer>
	)
}
