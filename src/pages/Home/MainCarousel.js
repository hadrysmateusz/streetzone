import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

import { ReactComponent as Logo } from "./white-logomark-with-name.svg"

const MainCarouselContainer = styled.div`
	background: linear-gradient(30deg, #373737, #1a1a1a 55%);
	padding-top: var(--spacing4);
	height: 220px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding-top: var(--spacing5);
		height: 350px;
	}
`

const LogoContainer = styled.div`
	height: 100px;
	margin-bottom: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		height: 130px;
		margin-bottom: var(--spacing4);
	}
`

const MainText = styled.div`
	margin-bottom: var(--spacing2);
	font-weight: bold;
	color: white;
	text-align: center;
	font-size: var(--fs-s);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--fs-l);
	}
`

const SecondaryText = styled.div`
	margin-bottom: var(--spacing4);
	font-size: var(--fs-xs);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: var(--fs-s);
	}
	color: var(--gray50);
	text-align: center;
`

const MainCarousel = () => {
	return (
		<MainCarouselContainer>
			<PageContainer>
				<LogoContainer>
					<Logo />
				</LogoContainer>
				<MainText>Cały Polski Streetwear w jednym miejscu</MainText>
				<SecondaryText>Tablica. Dropy. Artykuły. Newsy.</SecondaryText>
			</PageContainer>
		</MainCarouselContainer>
	)
}

export default MainCarousel
