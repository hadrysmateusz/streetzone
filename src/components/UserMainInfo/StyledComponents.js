import styled from "styled-components"

export const MainInfoContainer = styled.div`
	display: grid;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: max-content 1fr max-content;
	}

	gap: 20px;
	overflow: hidden;

	> :first-child {
		margin: 0 auto;
	}

	@media (max-width: ${(p) => p.theme.breakpoints[0] - 1}px) {
		text-align: center;
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
	--vertical-margin: 10px;
	margin: var(--vertical-margin) calc(var(--vertical-margin) * -1);
	> * {
		padding: 3px 10px;
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
