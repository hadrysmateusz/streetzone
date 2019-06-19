import styled from "styled-components/macro"
import { getCategoryColor } from "../../../style-utils"

export const Heading = styled.h1`
	font-size: var(--font-size--l);
	font-weight: bold;
	padding-left: var(--spacing2);
	border-left: 3px solid
		${(p) => (p.category ? getCategoryColor(p.category) : "var(--gray50)")};
`
