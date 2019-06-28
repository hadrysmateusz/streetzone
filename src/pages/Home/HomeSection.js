import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"

const OuterContainer = styled.div.attrs((p) => ({
	...p,
	deg: p.inverse ? "335deg" : "25deg"
}))`
	background: linear-gradient(${(p) => p.deg}, #f0f0f0, white 43%);
	padding: var(--spacing4) 0;
	height: 350px;
`

const InnerContainer = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: ${(p) => (p.inverse ? "1fr auto" : "auto 1fr")};
	height: 100%;
`

const SectionHeader = styled.h2`
	margin: 0;
	margin-bottom: var(--spacing2);
	font-size: 4.2rem;
	font-weight: bold;
	color: var(--black25);
	text-align: ${(p) => (p.inverse ? "left" : "right")};
`

const SectionBodyText = styled.p`
	margin: 0;
	color: var(--gray25);
	text-align: ${(p) => (p.inverse ? "left" : "right")};
`

const TextContainer = styled.div`
	margin-top: -24px;
	max-width: 450px;
	order: ${(p) => (p.inverse ? 0 : 1)};
`

const CardsContainer = styled.div``

const HomeSection = ({ inverse = false, header, body, component: C, data }) => {
	return (
		<OuterContainer inverse={inverse}>
			<PageContainer fullHeight>
				<InnerContainer inverse={inverse}>
					<TextContainer inverse={inverse}>
						<SectionHeader inverse={inverse}>{header}</SectionHeader>
						<SectionBodyText inverse={inverse}>{body}</SectionBodyText>
					</TextContainer>
					<CardsContainer>
						{data.map((values) => (
							<C {...values} key={values.id} />
						))}
					</CardsContainer>
				</InnerContainer>
			</PageContainer>
		</OuterContainer>
	)
}

export default HomeSection
