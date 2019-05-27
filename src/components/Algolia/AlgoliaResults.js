import React from "react"
import { connectStateResults } from "react-instantsearch-dom"

import { AlgoliaInfiniteHits } from "../Algolia/AlgoliaHits"
import EmptyState, { QueryNoResults } from "../EmptyState"
import { InfoBlock } from "../Basics"
// import Button, { ButtonContainer } from "../Button"

import useDelayRender from "../../hooks/useDelayRender"
import { ResultsContainer } from "./StyledComponents"
import { FEATURES } from "../../constants"

const EndingInfoBlock = () => {
	const shouldRender = useDelayRender(250)
	return shouldRender ? (
		<InfoBlock>
			<h3>ZAPISZ FILTRY</h3>
			<p>
				Możesz zapisać obecne filtry, by szybciej znaleźć to czego szukasz następnym
				razem. Zapisane filtry znajdziesz po lewej stronie w zakładce{" "}
				<em>zapisane filtry</em>.
			</p>
			{/* <ButtonContainer centered>
				<Button primary>ZAPISZ</Button>
			</ButtonContainer> */}
		</InfoBlock>
	) : null
}

const AlgoliaResults = connectStateResults(({ searchResults, searching }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0

	return (
		<ResultsContainer>
			<div hidden={!hasResults}>
				<AlgoliaInfiniteHits />
			</div>
			<div hidden={hasResults || searching}>
				<EmptyState state={QueryNoResults} />
			</div>
			{FEATURES.SAVING_FILTERS && (
				<div>
					<EndingInfoBlock />
				</div>
			)}
		</ResultsContainer>
	)
})

export default AlgoliaResults
