import styled from "styled-components"

export const Group = styled.div`
	:not(:last-child) {
		margin-bottom: var(--spacing3);
	}
`

export const RatingContainer = styled.div`
	margin: var(--spacing2) 0;
`

export const OuterContainer = styled.div`
	margin: 0 auto;
	border: 1px solid var(--gray100);
	background: var(--almost-white);
	padding: var(--spacing3);
	margin-bottom: var(--spacing5);
`
