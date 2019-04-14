import styled from "styled-components/macro"

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 4fr 6fr;
	gap: var(--spacing3);

	border: 1px solid var(--gray75);
	border-radius: 5px;
	overflow: hidden;
	box-shadow: inset 0 0 6px 1px rgba(0, 0, 0, 0.03), 2px 2px 10px 1px rgba(0, 0, 0, 0.08);
	padding: 16px;
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
