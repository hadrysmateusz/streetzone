import React from "react"
import { connectStateResults } from "react-instantsearch-dom"

import { AlgoliaInfiniteHits } from "../Algolia/AlgoliaHits"
import EmptyState, { QueryNoResults } from "../EmptyState"
import { InfoBlock } from "../Basics"
// import Button, { ButtonContainer } from "../Button"

import useDelayRender from "../../hooks/useDelayRender"
import { ResultsContainer } from "./StyledComponents"

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

const AlgoliaResults = connectStateResults(({ searchResults, searching, viewMode }) => {
	const hasResults = searchResults && searchResults.nbHits !== 0

	return (
		<ResultsContainer>
			<div hidden={!hasResults}>
				<AlgoliaInfiniteHits viewMode={viewMode} />
			</div>
			<div hidden={hasResults || searching}>
				<EmptyState state={QueryNoResults} />
			</div>
			<div>
				<EndingInfoBlock />
			</div>
		</ResultsContainer>
	)
})

export default AlgoliaResults
