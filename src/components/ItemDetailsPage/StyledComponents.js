import styled from "styled-components"

export const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	max-width: ${(p) => p.theme.breakpoints[4]}px;
	margin: 0 auto;
	height: 100%;
`

export const ItemContainer = styled.div`
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
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding-left: 20px;
		padding-top: 10px;
		max-width: 330px;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		max-width: 380px;
		padding-left: 30px;
		padding-top: 15px;
	}
`

export const UserInfoContainer = styled.div`
	margin-top: 10px;
`

export const Description = styled.div`
	margin-top: 10px;
	color: #3d3d3d;
`

export const ButtonsContainer = styled.div`
	margin-top: 10px;
	display: flex;
	align-content: flex-start;
`

export const MainInfo = styled.div`
	margin: 0 0 15px;
	font-size: 1.5rem;
`

export const Designers = styled.h3`
	display: inline;
	font-size: 1.8rem;
	font-weight: bold;
`

export const Sold = styled.div`
	font-size: 2.1rem;
	color: ${(p) => p.theme.colors.danger[50]};
	margin-bottom: 12px;
	font-weight: 500;
`
