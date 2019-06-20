import React from "react"
import styled from "styled-components/macro"
import { ROUTES } from "../../constants"
import { StyledLink } from "../../components/Basics"
import { encodeURL } from "../../utils/algoliaURLutils"
import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"

import { SearchWrapper } from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"
import connectInfiniteHits from "react-instantsearch-core/dist/cjs/connectors/connectInfiniteHits"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"

const DesignerLink = ({ value }) => {
	return (
		<StyledLink to={encodeURL({ designers: [value] }, ROUTES.MARKETPLACE)}>
			{value}
		</StyledLink>
	)
}

const SectionContainer = styled.div`
	margin: var(--spacing4) 0;
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: var(--spacing1);
`

const List = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--spacing1);
`

const ListContainer = styled.div`
	margin: 0 auto;
	max-width: 650px;
`

const Nav = styled.div`
	padding: var(--spacing3) 0;
	border-bottom: 1px solid var(--gray75);
	display: flex;
	justify-content: space-around;
`

const NavItemContainer = styled.div`
	font-family: var(--font-family--serif);
	font-size: var(--font-size--l);
`

const NavItem = ({ value }) => {
	return <NavItemContainer>{value}</NavItemContainer>
}

const chars = [
	"#",
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z"
]

export const DesignersList = connectInfiniteHits(({ hits }) => {
	console.log(hits)
	const sortedHits = hits.reduce(
		(acc, curr, i) => {
			var firstLetter = curr.label[0]

			var regex = /[A-Z]/g
			var isLetter = firstLetter.match(regex)
			if (!isLetter) {
				acc["#"].push(curr)
				return acc
			}

			if (acc[firstLetter]) {
				acc[firstLetter].push(curr)
				return acc
			} else {
				acc[firstLetter] = [curr]
				return acc
			}
		},
		{ "#": [] }
	)

	let components = []
	Object.entries(sortedHits).forEach(([key, value]) => {
		const header = (
			<TextBlock serif size="6.4rem">
				{key}
			</TextBlock>
		)
		const list = value.map((designer) => (
			<TextBlock uppercase color="gray0">
				<DesignerLink value={designer.label} />
			</TextBlock>
		))

		components.push(
			<SectionContainer>
				<div>{header}</div>
				<List>{list}</List>
			</SectionContainer>
		)
	})

	return (
		<div>
			<Nav>
				{chars.map((char) => (
					<NavItem value={char} />
				))}
			</Nav>
			<ListContainer>{components}</ListContainer>
		</div>
	)
})

const DesignersPage = () => {
	return (
		<SearchWrapper
			indexName={CONST.DESIGNERS_ALGOLIA_INDEX}
			hitsPerPage={9999}
			ignoreArchivedStatus
		>
			<PageContainer>
				<TextBlock centered serif size="l">
					Projektanci
				</TextBlock>

				<AlgoliaSearchBox placeholder="Szukaj" />

				<DesignersList />
			</PageContainer>
		</SearchWrapper>
	)
}

export default DesignersPage
