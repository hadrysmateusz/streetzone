import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"

import { PageContainer } from "../../../components/Containers"
import { InfiniteResults } from "../../../components/Algolia/Helpers"

import PromotedDrop from "../PromotedDrop"

const PromotedContainer = styled.div`
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing3);
		height: 40vw;
		max-height: 500px;
	}
`

const OuterContainer = styled.div`
	padding-bottom: var(--spacing3);
`

const PromotedSection = withBreakpoints(({ currentBreakpoint }) => {
	const isMobile = currentBreakpoint <= 1

	return (
		/* intentionally hidden visually to prevent resizing bug */
		<div hidden={isMobile}>
			<PageContainer>
				<OuterContainer>
					<PromotedContainer>
						<InfiniteResults>
							{({ results }) => {
								const selected = results.slice(0, 2)
								return selected.map((hit) => <PromotedDrop {...hit} />)
							}}
						</InfiniteResults>
					</PromotedContainer>
				</OuterContainer>
			</PageContainer>
		</div>
	)
})

export default PromotedSection
