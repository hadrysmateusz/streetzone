import React from "react"
import styled from "styled-components"

const SeparatorBase = ({ children, ...rest }) => (
	<div {...rest}>
		<div className="horizontal-rule" />
		<div className="children">{children}</div>
		<div className="horizontal-rule" />
	</div>
)

const Separator = styled(SeparatorBase)`
	padding: ${(p) => p.spacing || "6px"} 0;
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
		gap: 6px;
		padding: 0 6px;
		color: ${(p) => p.theme.colors.gray[25]};
	}
`

export default Separator
