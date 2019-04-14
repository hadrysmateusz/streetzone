import React from "react"
import { UncontrolledInstantSearchWrapper } from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"
import { AlgoliaInfiniteHits } from "../../components/Algolia/AlgoliaHits"
import { Configure } from "react-instantsearch-core"

const UserItems = () => {
	return (
		<div>
			<UncontrolledInstantSearchWrapper
				indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
			>
				<Configure hitsPerPage={6} />
				<AlgoliaInfiniteHits />
			</UncontrolledInstantSearchWrapper>
		</div>
	)
}

export default UserItems
