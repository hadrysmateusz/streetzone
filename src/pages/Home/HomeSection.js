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
`

const InnerContainer = styled.div`
	display: grid;
	height: 100%;
	gap: var(--spacing3);

	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		justify-items: ${(p) => (p.inverse ? "start" : "end")};
		grid-template-columns: 100%;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		align-items: center;
		justify-content: space-between;
		grid-template-columns: auto auto;
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
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		margin-top: -24px;
		order: ${(p) => (p.inverse ? 0 : 1)};
	}
`

const CardsContainer = styled.div`
	width: 100%;
`

const CardsContainerInner = styled.div`
	display: grid;
	grid-template-columns: repeat(2, minmax(220px, 1fr));
	gap: var(--spacing3);
	justify-items: start;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		${(p) => p.inverse && "justify-items: end;"}
	}

	/* make the content go from edge to edge on mobile*/
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		display: grid;
		gap: var(--spacing2);
		grid-auto-columns: 90%;
		overflow: auto;
		width: auto;
		grid-auto-flow: column;

		--x-margin: calc(-1 * var(--spacing3));
		margin-left: var(--x-margin);
		margin-right: calc(-1 * var(--spacing3));
		padding: 0 var(--spacing3);
		&::after {
			content: "";
			display: block;
			width: var(--spacing2);
		}
	}
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
						<InnerContainer inverse={inverse}>
							<TextContainer inverse={inverse}>
								<SectionHeader inverse={inverse}>{header}</SectionHeader>
								<SectionBodyText inverse={inverse}>{body}</SectionBodyText>
							</TextContainer>
							<CardsContainer inverse={inverse}>
								<CardsContainerInner inverse={inverse}>
									{arrayPad(results, 2, true).map((result) =>
										result === true ? <Placeholder /> : <C {...result} key={result.id} />
									)}
								</CardsContainerInner>
							</CardsContainer>
						</InnerContainer>
					</PageContainer>
				)}
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default HomeSection
