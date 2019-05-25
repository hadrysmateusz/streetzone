import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { TextBlock } from "../StyledComponents"

export const GroupContainer = styled.section`
	margin-bottom: var(--spacing4);

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing3);
	}

	.content {
		display: grid;
		gap: var(--spacing2);
		grid-auto-columns: 70%;
		overflow: auto;
		width: auto;
		grid-auto-flow: column;

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-auto-flow: column;
			grid-template-columns: repeat(3, 1fr);
		}

		/* make the content go from edge to edge on mobile*/
		@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
			margin: 0 calc(-1 * var(--spacing3));
			padding: 0 var(--spacing3);
			&::after {
				content: "";
				display: block;
				width: var(--spacing2);
			}
		}
	}
`

const Group = ({ title, hasMore, children, linkTo }) => {
	return (
		<GroupContainer>
			<header>
				{title && (
					<TextBlock bold uppercase size="m">
						{title}
					</TextBlock>
				)}
				{hasMore && (
					<Link to={linkTo}>
						<TextBlock color="gray0">
							Więcej <FontAwesomeIcon size="xs" icon="arrow-right" />
						</TextBlock>
					</Link>
				)}
			</header>
			<div className="content">{children}</div>
		</GroupContainer>
	)
}

export default Group
