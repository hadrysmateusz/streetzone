import React from "react"
import styled from "styled-components/macro"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"
import { AlgoliaInfiniteHits } from "../../components/Algolia/AlgoliaHits"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import { PageContainer } from "../../components/Containers"
import { OwnerItemCard } from "../../components/Cards"

const ItemsList = styled.div`
	> * + * {
		margin-top: var(--spacing4);
	}
`

export const InfiniteOwnerCards = () => {
	return (
		<InfiniteScrollingResults>
			{({ results, hasMore, loadMore }) => (
				<ItemsList>
					{results.map((item) => (
						<OwnerItemCard {...item} />
					))}
				</ItemsList>
			)}
		</InfiniteScrollingResults>
	)
}

const UserItems = ({ isAuthorized, userId }) => {
	return (
		<PageContainer extraWide>
			<StatelessSearchWrapper
				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				refinements={{ userId }}
				limit={6}
			>
				{isAuthorized ? <InfiniteOwnerCards /> : <AlgoliaInfiniteHits />}
			</StatelessSearchWrapper>
		</PageContainer>
	)
}

export default UserItems
