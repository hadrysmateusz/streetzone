import styled from "styled-components/macro"

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	gap: var(--spacing3);
	overflow: hidden;
	padding: var(--spacing3);
	justify-content: start;

	background: var(--almost-white);
	border: 1px solid var(--gray100);
	box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.04);

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-template-columns: 120px 1fr;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		grid-template-columns: 200px 1fr;
	}
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

export const ImageContainer = styled.div`
	max-width: 100%;
	max-height: 100%;

	width: 100%;
	height: 100%;

	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: flex-start;

	overflow: hidden;
`

export const Image = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`
