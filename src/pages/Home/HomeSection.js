import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"

const OuterContainer = styled.div.attrs((p) => ({
	...p,
	deg: p.inverse ? "335deg" : "25deg"
}))`
	background: linear-gradient(${(p) => p.deg}, #f0f0f0, white 43%);
	padding: var(--spacing4) 0;
	/* height: 220px; */
	/* @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		height: 350px;
	} */
`

const InnerContainer = styled.div`
	display: grid;
	align-items: center;
	justify-content: space-between;
	grid-template-columns: auto auto;
	height: 100%;
	gap: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		gap: var(--spacing4);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		gap: var(--spacing5);
	}
`

const SectionHeader = styled.h2`
	margin: 0;
	margin-bottom: var(--spacing2);
	font-size: var(--fs-xl);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: 4.2rem;
	}
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
	width: 100%;
	max-width: 450px;
	margin-top: -24px;
	order: ${(p) => (p.inverse ? 0 : 1)};
`

const CardsContainer = styled.div`
	display: none;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
	}
	gap: var(--spacing3);
	${(p) => p.inverse && "justify-items: end;"}
	grid-template-columns: repeat(2, minmax(220px, 1fr));
`

// TODO: replace these placeholders with better ones
const Placeholder = styled.div`
	width: 100%;
	height: 280px;
	background: var(--gray100);
`

const arrayPad = (array, length, fillWith) => {
	const secondArrLen = length - array.length
	const newArray = [...array].concat(Array(secondArrLen).fill(fillWith))
	return newArray
}

const HomeSection = ({ inverse = false, header, body, component: C, indexName }) => {
	return (
		<OuterContainer inverse={inverse}>
			<StatelessSearchWrapper indexName={indexName} limit={2}>
				{(results) => (
					<PageContainer fullHeight>
						<InnerContainer>
							<TextContainer inverse={inverse}>
								<SectionHeader inverse={inverse}>{header}</SectionHeader>
								<SectionBodyText inverse={inverse}>{body}</SectionBodyText>
							</TextContainer>
							<CardsContainer inverse={inverse}>
								{arrayPad(results, 2, true).map((result) =>
									result === true ? <Placeholder /> : <C {...result} key={result.id} />
								)}
							</CardsContainer>
						</InnerContainer>
					</PageContainer>
				)}
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default HomeSection
