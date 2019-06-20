import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { connectInfiniteHits } from "react-instantsearch-core"

import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import { SearchWrapper } from "../../components/InstantSearchWrapper"
import AlgoliaSearchBox from "../../components/Algolia/AlgoliaSearchBox"

import { encodeURL } from "../../utils/algoliaURLutils"
import { CONST, ROUTES } from "../../constants"
import { ellipsis } from "polished"

const Header = styled.div`
	margin: var(--spacing4) 0;
	/* font-family: var(--ff-serif); */
	font-size: var(--fs-l);
	font-weight: bold;
	text-align: center;
`

const OuterContainer = styled.div`
	max-width: 100%;
`

const SectionContainer = styled.div`
	margin: var(--spacing4) 0;
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: var(--spacing2);
`

const List = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

	> * {
		${ellipsis}
	}
	grid-auto-rows: min-content;
	gap: var(--spacing2);
	align-content: center;
`

const ListContainer = styled.div`
	margin: var(--spacing4) auto 0;
	max-width: 700px;
`

const LetterNavbarContainer = styled.div`
	overflow: auto;
	border-bottom: 1px solid var(--gray75);

	/* make the content go from edge to edge on mobile*/
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		--x-margin: calc(-1 * var(--spacing3));
		margin-left: var(--x-margin);
		margin-right: var(--x-margin);
		padding: 0 var(--spacing3);
		&::after {
			content: "";
			display: block;
			width: var(--spacing2);
		}
	}
`

const LetterNavbar = styled.div`
	overflow: visible;

	padding-bottom: var(--spacing2);
	display: flex;
	justify-content: space-around;
	min-width: 850px;
	width: 100%;
`

const NavLetterContainer = styled.div`
	cursor: ${(p) => (p.isEmpty ? "default" : "pointer")};
	${(p) => p.isEmpty && "color: var(--gray25);"}
	font-family: var(--font-family--serif);
	font-size: var(--font-size--l);
`

const StyledLink = styled(Link)`
	cursor: pointer;
	color: var(--gray0);
	text-transform: uppercase;
	:hover {
		color: var(--black0);
	}
`

const DesignerLink = ({ value }) => {
	return (
		<div>
			<StyledLink to={encodeURL({ designers: [value] }, ROUTES.MARKETPLACE)}>
				{value}
			</StyledLink>
		</div>
	)
}

const NavLetter = ({ value, isEmpty }) => {
	const onClick = () =>
		document
			.getElementById(`designers-list-section-${value}`)
			.scrollIntoView({ behavior: "smooth", block: "start" })

	return (
		<NavLetterContainer isEmpty={isEmpty} onClick={onClick}>
			{value}
		</NavLetterContainer>
	)
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

const ListSection = ({ letter, items }) => {
	if (!items || items.length === 0) return null

	return (
		<SectionContainer id={`designers-list-section-${letter}`}>
			<TextBlock serif size="6.4rem">
				{letter}
			</TextBlock>
			<List>
				{items.map((designer) => (
					<DesignerLink value={designer.label} key={designer} />
				))}
			</List>
		</SectionContainer>
	)
}

export const DesignersList = connectInfiniteHits(({ hits }) => {
	const groupedHits = useMemo(
		() =>
			hits.reduce(
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
			),
		[hits]
	)

	return (
		<OuterContainer>
			<LetterNavbarContainer>
				<LetterNavbar>
					{chars.map((char) => {
						const isEmpty = !groupedHits[char] || groupedHits[char].length === 0
						return <NavLetter key={char} isEmpty={isEmpty} value={char} />
					})}
				</LetterNavbar>
			</LetterNavbarContainer>

			<ListContainer>
				<AlgoliaSearchBox placeholder="Szukaj" />
				{Object.entries(groupedHits).map(([letter, items]) => (
					<ListSection letter={letter} items={items} key={letter} />
				))}
			</ListContainer>
		</OuterContainer>
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
				<Header>Projektanci</Header>

				<DesignersList />
			</PageContainer>
		</SearchWrapper>
	)
}

export default DesignersPage
