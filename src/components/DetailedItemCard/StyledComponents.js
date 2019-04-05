import styled from "styled-components/macro"

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 4fr 6fr;
	gap: var(--spacing3);
`

export const Section = styled.div`
	&:not(:last-child) {
		border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`

export const DetailsContainer = styled.div`
	display: grid;
	grid-auto-flow: row;
	gap: var(--spacing2);
`
