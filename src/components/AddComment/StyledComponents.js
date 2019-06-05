import styled from "styled-components/macro"

export const Group = styled.div`
	:not(:last-child) {
		margin-bottom: var(--spacing3);
	}
`

export const RatingContainer = styled.div`
	margin: var(--spacing2) 0;
`

export const OuterContainer = styled.div`
	margin-bottom: var(--spacing4);
	background: var(--almost-white);
	/* border: 1px solid var(--gray100); */
	/* box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04); */
	padding: var(--spacing3);
`
