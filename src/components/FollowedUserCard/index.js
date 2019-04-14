import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { Configure } from "react-instantsearch-core"

import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"

import UserPreview from "../UserPreview"
import { SmallTextBlock } from "../StyledComponents"
import ItemsView from "../ItemsView"
import { HeartButton, TYPE } from "../SaveButton"
import { AlgoliaInfiniteHits, AlgoliaScrollableHits } from "../Algolia/AlgoliaHits"
import { VirtualMenu } from "../Algolia/Virtual"
import { UncontrolledInstantSearchWrapper } from "../InstantSearchWrapper"
import { CONST } from "../../constants"
import { useUserData } from "../../hooks"

import { UpperGrid, OuterContainer } from "./StyledComponents"

const MAX_ITEMS = 3

const FollowedUserCard = ({ id }) => {
	const [user, error] = useUserData(id)

	console.log(user, error)

	return user ? (
		<OuterContainer>
			<UpperGrid>
				<UserPreview user={user} error={error} id={id} />
				<HeartButton id={id} type={TYPE.USER} scale="2" />
			</UpperGrid>
			{!error && (
				<>
					<SmallTextBlock>Najnowsze Przedmioty</SmallTextBlock>

					<UncontrolledInstantSearchWrapper
						indexName={CONST.DEV_ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
					>
						<VirtualMenu attribute="userId" defaultRefinement={id} />
						<Configure hitsPerPage={3} />
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
