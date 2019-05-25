import styled from "styled-components/macro"
import { getCategoryColor } from "../../../style-utils"

export const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
		grid-template-columns: 1fr minmax(220px, 25%);
		gap: var(--spacing3);
	}
`

export const Heading = styled.h1`
	font-size: var(--font-size--l);
	font-weight: bold;
	padding-left: var(--spacing2);
	border-left: 3px solid
		${(p) => (p.category ? getCategoryColor(p.category) : "var(--gray50)")};
`
