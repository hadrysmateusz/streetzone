import React from "react"
import styled from "styled-components/macro"
import { connectStateResults } from "react-instantsearch-dom"

const ResultsCountContainer = styled.div`
	color: var(--gray25);
`

const ResultsCount = connectStateResults(({ searchResults }) => {
	const nbHits = searchResults && searchResults.nbHits

	return <ResultsCountContainer>{nbHits} wyników</ResultsCountContainer>
})

export default ResultsCount
