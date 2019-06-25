import styled from "styled-components/macro"

export const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	font-size: var(--fs-m);
	font-weight: bold;
	margin: var(--spacing3) 0;

	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		margin: var(--spacing4) 0;
	}

	.count {
		color: var(--gray0);
		margin-left: var(--spacing2);
	}
`
