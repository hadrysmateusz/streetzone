import React from "react"
import styled from "styled-components/macro"
import { connectStats } from "react-instantsearch-dom"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import { AlgoliaInfiniteHits } from "../../components/Algolia/AlgoliaHits"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import { PageContainer } from "../../components/Containers"
import { OwnerItemCard } from "../../components/Cards"

import { CONST } from "../../constants"

const ItemsList = styled.div`
	> * + * {
		margin-top: var(--spacing4);
	}
`

const HeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	font-size: var(--fs-m);
	font-weight: bold;
	margin: var(--spacing3) 0;

	@media (min-width: ${(p) => p.theme.breakpoints[3]}px) {
		margin: var(--spacing4) 0;
	}

	.count {
		color: var(--gray0);
		margin-left: var(--spacing2);
	}
`

const InfiniteOwnerCards = () => {
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

const Header = connectStats(({ nbHits }) => {
	return (
		<HeaderContainer>
			Wszystkie przedmioty <div className="count">{nbHits}</div>
		</HeaderContainer>
	)
})

const UserItems = ({ isAuthorized, userId }) => {
	return (
		<PageContainer extraWide>
			<StatelessSearchWrapper
				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
				refinements={{ userId }}
				limit={6}
			>
				<Header />
				{isAuthorized ? <InfiniteOwnerCards /> : <AlgoliaInfiniteHits />}
			</StatelessSearchWrapper>
		</PageContainer>
	)
}

export default UserItems
