import React from "react"
import { connectStateResults } from "react-instantsearch-dom"

import { AlgoliaInfiniteHits } from "../Algolia/AlgoliaHits"
import EmptyState, { QueryNoResults } from "../EmptyState"
import { InfoBlock } from "../Basics"
import Button, { ButtonContainer } from "../Button"

import { ResultsContainer } from "./StyledComponents"

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
			<div>
				<InfoBlock>
					<h3>TO JUŻ WSZYSTKO</h3>
					<p>
						Możesz zapisać obecne filtry, by szybciej znaleźć to czego szukasz następnym
						razem. Zapisane filtry znajdziesz po lewej stronie w zakładce{" "}
						<em>zapisane filtry</em>.
					</p>
					<ButtonContainer centered>
						<Button primary>ZAPISZ</Button>
					</ButtonContainer>
				</InfoBlock>
			</div>
		</ResultsContainer>
	)
})

export default AlgoliaResults