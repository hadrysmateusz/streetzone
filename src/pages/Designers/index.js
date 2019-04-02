import React from "react"
import styled from "styled-components"
import { ROUTES } from "../../constants"
import { StyledLink } from "../../components/Basics"
import { encodeURL } from "../../utils/algoliaURLutils"
import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"

import cloneDeep from "clone-deep"

import InstantSearchWrapper from "../../components/InstantSearchWrapper"
import { CONST } from "../../constants"
import connectInfiniteHits from "react-instantsearch-core/dist/cjs/connectors/connectInfiniteHits"

const DEFAULT_HITS_PER_PAGE = 12

const DEFAULT_SEARCH_STATE = Object.freeze({
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	refinementList: {},
	query: "",
	page: 1
})

class InstantSearchDesignersWrapper extends React.Component {
	urlToState = (parsedSearch) => {
		let searchState = cloneDeep(DEFAULT_SEARCH_STATE)
		// format the searchState according to Algolia's spec
		const { tags, section, query, page } = parsedSearch

		searchState.refinementList.section = section || []
		searchState.refinementList.tags = tags || []
		searchState.query = query || ""
		searchState.page = page || 1

		return searchState
	}

	onSearchStateChange = async (newSearchState) => {
		// format the state to keep the url relatively short
		const { refinementList, query, page } = newSearchState
		let formattedState = {}
		if (refinementList !== undefined) {
			if (refinementList.tags !== undefined) formattedState.tags = refinementList.tags
			if (refinementList.section !== undefined)
				formattedState.section = refinementList.section
		}
		if (page !== undefined) formattedState.page = page
		if (query !== undefined) formattedState.query = query

		return formattedState
	}

	render() {
		return (
			<InstantSearchWrapper
				indexName={CONST.DEV_DESIGNERS_ALGOLIA_INDEX}
				onSearchStateChange={this.onSearchStateChange}
				urlToState={this.urlToState}
				defaultSearchState={DEFAULT_SEARCH_STATE}
			>
				{this.props.children}
			</InstantSearchWrapper>
		)
	}
}

// const useDesigners = () => {
// 	const firebase = useFirebase()
// 	const [designers, setDesigners] = useState(null)

// 	const getDesigners = async () => {
// 		const snap = await firebase.designers().get()
// 		let designersArr = []
// 		snap.forEach((designer) => {
// 			console.log(designer, designer.data())
// 			designersArr.push(designer.data())
// 		})
// 		setDesigners(designersArr)
// 	}

// 	useEffect(() => {
// 		getDesigners()
// 	}, [])

// 	return designers
// }

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

export const DesignersList = connectInfiniteHits(({ hits, hasMore, refine, ...rest }) => {
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

	// debugger
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
	// const designers = useDesigners()

	return (
		<InstantSearchDesignersWrapper>
			<PageContainer>
				<TextBlock centered serif size="l">
					Projektanci
				</TextBlock>

				<DesignersList />

				{/* {designers.map((designer) => (
							<DesignerLink value={designer.label} />
						))} */}
			</PageContainer>
		</InstantSearchDesignersWrapper>
	)
}

export default DesignersPage
