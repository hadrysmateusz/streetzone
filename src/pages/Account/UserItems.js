import React from "react"
import styled from "styled-components/macro"
import { connectStats } from "react-instantsearch-dom"
import { Link } from "react-router-dom"

import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import InfiniteScrollingResults from "../../components/InfiniteScrollingResults"
import { PageContainer } from "../../components/Containers"
import { OwnerItemCard } from "../../components/Cards"
import { Button } from "../../components/Button"
import ItemsView from "../../components/ItemsView"
import EmptyState from "../../components/EmptyState/new"

import { CONST } from "../../constants"
import { route } from "../../utils"

import { SaveButton } from "../../components/SaveButton"
import { TYPE } from "../../components/DropCountdown/FollowButton"

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

const ItemsResults = ({ isAuthorized, userId }) => {
	return isAuthorized ? (
		<InfiniteScrollingResults
			emptyState={
				<EmptyState header="Nie wystawiłeś jeszcze żadnego przedmiotu">
					<Button as={Link} to={route("NEW_ITEM")} primary>
						Zacznij sprzedawać
					</Button>
				</EmptyState>
			}
		>
			{({ results, hasMore, loadMore }) => (
				<ItemsList>
					{results.map((item) => (
						<OwnerItemCard key={item.id} {...item} />
					))}
				</ItemsList>
			)}
		</InfiniteScrollingResults>
	) : (
		<InfiniteScrollingResults
			emptyState={
				<EmptyState header="Ten użytkownik nie wystawił aktualnie żadnego przedmiotu">
					<div>Obserwuj by dowiedzieć się gdy coś wystawi</div>
					<SaveButton
						type={TYPE.USER}
						id={userId}
						text="Obserwuj"
						savedText="Obserwujesz"
						fullWidth
					/>
				</EmptyState>
			}
		>
			{({ results, hasMore, loadMore }) => <ItemsView items={results} />}
		</InfiniteScrollingResults>
	)
}

const Header = connectStats(({ nbHits }) => {
	return (
		<HeaderContainer>
			Wszystkie przedmioty <div className="count">{nbHits || 0}</div>
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
				<ItemsResults isAuthorized={isAuthorized} userId={userId} />
			</StatelessSearchWrapper>
		</PageContainer>
	)
}

export default UserItems
