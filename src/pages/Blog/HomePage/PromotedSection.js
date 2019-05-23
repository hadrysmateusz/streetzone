import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../../constants"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import Carousel from "../../../components/Carousel"

import { PromotedPost } from "../Previews"

const DesktopContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: var(--spacing3);
	height: 440px;
	> *:first-child {
		grid-row: span 2;
	}
`

const MobileContainer = styled.div`
	height: 28vh;
`

const MobilePromotedSection = ({ results }) => {
	return (
		<MobileContainer>
			<Carousel nOfElements={results.length}>
				{() => results.map((result) => <PromotedPost key={result.id} {...result} />)}
			</Carousel>
		</MobileContainer>
	)
}

const DesktopPromotedSection = ({ results }) => {
	console.log("results", results)
	return (
		<DesktopContainer>
			{results.map((result) => (
				<PromotedPost key={result.id} {...result} />
			))}
		</DesktopContainer>
	)
}

const PromotedSection = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint <= 1

	return (
		<StatelessSearchWrapper
			limit={3}
			indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
			refinements={{ isPromoted: true }}
		>
			{(results) =>
				isMobile ? (
					<MobilePromotedSection results={results} />
				) : (
					<DesktopPromotedSection results={results} />
				)
			}
		</StatelessSearchWrapper>
	)
})

export default PromotedSection
