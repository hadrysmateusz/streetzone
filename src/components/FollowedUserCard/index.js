import React from "react"
import { Configure } from "react-instantsearch-core"

import LoadingSpinner from "../LoadingSpinner"

import UserPreview from "../UserPreview"
import { SmallTextBlock } from "../StyledComponents"
import { SaveIconButton } from "../SaveButton"
import { AlgoliaScrollableHits } from "../Algolia/AlgoliaHits"
import { VirtualMenu } from "../Algolia/Virtual"
import { UncontrolledInstantSearchWrapper } from "../InstantSearchWrapper"
import { CONST } from "../../constants"
import { useUserData } from "../../hooks"

import { UpperGrid, OuterContainer } from "./StyledComponents"

const MAX_ITEMS = 3

const FollowedUserCard = ({ id }) => {
	const [user, error] = useUserData(id)

	return user ? (
		<OuterContainer>
			<UpperGrid>
				<UserPreview user={user} error={error} id={id} />
				<SaveIconButton id={id} type="user" scale="2" />
			</UpperGrid>
			{!error && (
				<>
					<SmallTextBlock>Najnowsze Przedmioty</SmallTextBlock>

					<UncontrolledInstantSearchWrapper
						indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
					>
						<VirtualMenu attribute="userId" defaultRefinement={id} />
						<Configure hitsPerPage={MAX_ITEMS} />
						<AlgoliaScrollableHits />
					</UncontrolledInstantSearchWrapper>
				</>
			)}
		</OuterContainer>
	) : (
		<LoadingSpinner fixedHeight />
	)
}

export default FollowedUserCard
