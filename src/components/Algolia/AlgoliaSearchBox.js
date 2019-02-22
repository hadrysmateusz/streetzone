import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { SearchBox, StyledPoweredBy, OuterSearchContainer } from "./StyledComponents"

class AlgoliaSearchBox extends React.Component {
	delay = 350

	state = { inputValue: this.props.currentRefinement }

	componentDidMount() {
		try {
			// get the encoded search parameter from URL
			var searchParams = new URLSearchParams(this.props.location.search)
			const search = searchParams.get("search")

			// decode and parse the search paramter
			const convertedSearch = atob(search)
			const parsedSearch = JSON.parse(convertedSearch)

			this.setState({ inputValue: parsedSearch.query })
		} catch (e) {
			// if there was a problem while parsing, empty the field
			this.setState({ inputValue: "" })
		}
	}

	onChange = (e) => {
		// get the currentTarget from the synthetic event before its inaccessible
		const currentTarget = e.currentTarget
		// update the internal state
		this.setState({ inputValue: currentTarget.value })

		// the timeout makes it so the query only gets updated when you stop typing
		clearTimeout(this.rateLimitedRefine)
		this.rateLimitedRefine = setTimeout(() => {
			this.props.refine(currentTarget.value)
		}, this.delay)
	}

	clearField = () => {
		this.setState({ inputValue: "" })

		this.props.refine()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location !== this.props.location) {
			try {
				// get the encoded search parameter from URL
				var searchParams = new URLSearchParams(this.props.location.search)
				const search = searchParams.get("search")

				// decode and parse the search paramter
				const convertedSearch = atob(search)
				const parsedSearch = JSON.parse(convertedSearch)

				this.setState({ inputValue: parsedSearch.query })
			} catch (e) {
				// if there was a problem while parsing, empty the field
				this.setState({ inputValue: "" })
			}
		}
	}

	render() {
		return (
			<OuterSearchContainer>
				<SearchBox>
					<div className="icon-container">
						<FontAwesomeIcon icon="search" />
					</div>
					<input
						type="text"
						onChange={this.onChange}
						value={this.state.inputValue}
						placeholder="Szukaj po nazwie, marce, kategorii itd."
					/>
					{this.state.inputValue && (
						<div className="icon-container" onClick={this.clearField}>
							<FontAwesomeIcon icon="times" />
						</div>
					)}
					<div className="powered-by-container">
						<StyledPoweredBy />
					</div>
				</SearchBox>
			</OuterSearchContainer>
		)
	}
}

export default compose(
	withRouter,
	connectSearchBox
)(AlgoliaSearchBox)
