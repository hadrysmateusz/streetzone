import React from "react"
import styled from "styled-components/macro"

import { CONST } from "../../constants"

const OuterContainer = styled.div``

const Heading = styled.div``
const StatelessSearchWrapper = styled.div``
const InnerContainer = styled.div``
const PromotedItemContainer = styled.div``

const MarketplacePromoted = () => {
	return (
		<OuterContainer>
			<Heading>Promowane na tablicy</Heading>
			<StatelessSearchWrapper
				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				refinements={{ promotedUntil: { min: Date.now() } }}
				limit={4}
			>
				{(results) => (
					<InnerContainer>
						{(results) => results.map((result) => <PromotedItemContainer {...result} />)}
					</InnerContainer>
				)}
			</StatelessSearchWrapper>
		</OuterContainer>
	)
}

export default MarketplacePromoted
