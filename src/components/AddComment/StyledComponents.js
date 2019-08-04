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
	border-top: 6px solid var(--gray100);
	margin-bottom: var(--spacing4);
	background: var(--almost-white);
	padding: var(--spacing3);
	padding-top: 18px;
`
