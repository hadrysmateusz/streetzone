import React from "react"
import { UncontrolledInstantSearchWrapper } from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"
import {
	AlgoliaInfiniteHits,
	InfiniteOwnerCards
} from "../../components/Algolia/AlgoliaHits"
import { VirtualMenu } from "../../components/Algolia/Virtual"
import { Configure } from "react-instantsearch-core"

import { PageContainer } from "../../components/Containers"

const UserItems = ({ isAuthorized, userId }) => {
	return (
		<PageContainer extraWide>
			<UncontrolledInstantSearchWrapper
				indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
			>
				<VirtualMenu attribute="userId" defaultRefinement={userId} />
				<Configure hitsPerPage={6} />
				{isAuthorized ? <InfiniteOwnerCards /> : <AlgoliaInfiniteHits />}
			</UncontrolledInstantSearchWrapper>
		</PageContainer>
	)
}

export default UserItems
