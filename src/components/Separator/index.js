import React from "react"
import styled from "styled-components/macro"

const SeparatorBase = ({ children, ...rest }) => (
	<div {...rest}>
		<div className="horizontal-rule" />
		<div className="children">{children}</div>
		<div className="horizontal-rule" />
	</div>
)

const Separator = styled(SeparatorBase)`
	padding: ${(p) => p.spacing || 0} 0;
	display: flex;
	align-items: center;
	justify-content: center;

	.horizontal-rule {
		height: 1px;
		width: 100%;
		background: ${(p) => p.theme.colors.gray[50]};
	}
	.children {
		white-space: nowrap;
		display: grid;
		grid-auto-flow: column;
		align-items: center;
		gap: var(--spacing1);
		:not(:empty) {
			padding: 0 var(--spacing1);
		}
		color: ${(p) => p.theme.colors.gray[25]};
	}
`

export default Separator
