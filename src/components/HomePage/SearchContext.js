import React from "react"
import qs from "qs"

const DEFAULT_HITS_PER_PAGE = 12
const DEFAULT_SORTING = "dev_items_createdAt_desc"
const INITIAL_SEARCH_STATE = {
	refinementList: {
		category: [],
		designers: [],
		size: []
	},
	hitsPerPage: DEFAULT_HITS_PER_PAGE,
	sortBy: DEFAULT_SORTING,
	query: "",
	page: 1
}

const updateAfter = 700

const createURL = (state) => `?${qs.stringify(state)}`

const searchStateToUrl = (props, searchState) =>
	searchState ? `${props.location.pathname}${createURL(searchState)}` : ""
const urlToSearchState = (location) => qs.parse(location.search.slice(1))

const SearchContext = React.createContext()

const withSearchProvider = (Component) => {
	return class extends React.Component {
		state = INITIAL_SEARCH_STATE

		// componentDidUpdate(prevProps) {
		//   if (prevProps.location !== this.props.location) {
		//     this.setState({ searchState: urlToSearchState(this.props.location) })
		//   }
		// }

		componentDidMount = () => {}

		componentWillUnmount = () => {}

		render() {
			return (
				<SearchContext.Provider
					value={{ searchState: this.state.searchState, setSearchState: this.setState }}
				>
					<Component {...this.props} />
				</SearchContext.Provider>
			)
		}
	}
}

export { withSearchProvider }
