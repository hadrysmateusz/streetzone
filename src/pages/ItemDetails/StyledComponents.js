import styled from "styled-components"

export const ItemContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	max-width: 100%;
	height: 100%;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		flex-direction: row;
	}
`

export const InfoContainer = styled.div`
	flex: 0 0 100%;
	background: white;
	padding-bottom: 70px;
	padding-left: 20px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		max-width: 330px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: 400px;
	}
`

export const ButtonsContainer = styled.div`
	margin: 10px 0;
	display: flex;
	align-content: flex-start;
`

export const SectionContainer = styled.div`
	:not(:last-child) {
		border-bottom: 1px solid var(--gray75);
	}
	padding: var(--spacing3) 0;
`

export const InfoItem = styled.div`
	text-transform: uppercase;
	font-weight: 500;
	color: #444;
	padding: 1px 0;
`

export const Sold = styled.div`
	color: ${(p) => p.theme.colors.danger[50]};
	margin-bottom: 12px;
	font-weight: 500;
`

export const Name = styled.div`
	color: ${(p) => p.theme.colors.black[75]};
	margin-bottom: 15px;
`

export const Designers = styled.h3`
	margin: 0;
	margin-bottom: 5px;
	font-weight: bold;
`
