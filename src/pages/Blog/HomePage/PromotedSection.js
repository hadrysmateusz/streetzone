import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import { CONST } from "../../../constants"

import StatelessSearchWrapper from "../../../components/InstantSearchWrapper/stateless"

import { PromotedPost } from "../Previews"

const DesktopContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	gap: var(--spacing2);

	grid-auto-rows: minmax(100px, 22vw);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: var(--spacing3);
		height: 440px;
		> *:first-child {
			grid-row: span 2;
		}
	}
`

const MobilePromotedSection = ({ results }) => {}

const DesktopPromotedSection = ({ results }) => {
	console.log("results", results)
	return (
		<DesktopContainer>
			{results.map((result) => (
				<PromotedPost {...result} />
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
