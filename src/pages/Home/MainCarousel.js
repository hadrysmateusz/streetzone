import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

import { ReactComponent as Logo } from "./white-logomark-with-name.svg"

const MainCarouselContainer = styled.div`
	background: linear-gradient(30deg, #373737, #1a1a1a 55%);
	height: 350px;
	padding-top: var(--spacing5);
`

const LogoContainer = styled.div`
	height: 130px;
	margin-bottom: var(--spacing4);
`

const MainText = styled.div`
	margin-bottom: var(--spacing2);
	font-weight: bold;
	font-size: var(--fs-l);
	color: white;
	text-align: center;
`

const SecondaryText = styled.div`
	margin-bottom: var(--spacing4);
	font-size: var(--fs-m);
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
