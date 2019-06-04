import styled from "styled-components/macro"

export const MainInfoContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-auto-flow: columns;
		grid-template-columns: 1fr max-content;
	}
`

export const InnerInfoContainer = styled.div`
	display: flex;
	> * + * {
		padding-left: var(--spacing3);
	}
`

export const SeparatedContainer = styled.div`
	display: flex;
	align-items: center;
	--vertical-margin: var(--spacing2);
	margin: var(--vertical-margin) calc(var(--vertical-margin) * -1);
	> * {
		padding: var(--spacing1) var(--spacing2);
	}
	> * + * {
		border-left: 1px solid ${(p) => p.theme.colors.gray[75]};
	}
`

export const SecondContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const InfoContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-auto-rows: min-content;
	max-width: 600px;
`

export const TopContainer = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr;
	gap: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: min-content 1fr;
		gap: var(--spacing3);
	}
`
