import React, { Component } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import SavedFilters from "./SavedFilters"
import {
	FiltersContainer,
	FilterInnerContainer,
	CloseIconContainer,
	Section,
	ActionsContainer,
	MobileFiltersHeader
} from "./StyledComponents"
import { ButtonContainer } from "../Button"
import AlgoliaRefinementList from "../Algolia/AlgoliaRefinementList"
import AlgoliaRange from "../Algolia/AlgoliaRange"
import Button from "../Button"
import { ROUTES } from "../../constants"
import { withAuthentication } from "../UserSession"
import { TextBlock } from "../StyledComponents"

const TABS = {
	category: {
		displayName: "Kategoria",
		id: "category"
	},
	designers: {
		displayName: "Projektanci",
		id: "designers"
	},
	size: {
		displayName: "Rozmiar",
		id: "size"
	},
	price: {
		displayName: "Cena",
		id: "price"
	},
	saved: {
		displayName: "Zapisane Filtry",
		id: "saved"
	}
}

const ClearAllFiltersButton = ({ history, onClick }) => (
	<Button
		onClick={() => {
			history.push(ROUTES.MARKETPLACE)
			onClick(true)
		}}
		fullWidth
	>
		Wyczyść filtry
	</Button>
)

export class Filters extends Component {
	state = { openTab: TABS.category }

	toggleTab = (tabId) => {
		this.setState({ openTab: TABS[tabId] })
	}

	render() {
		return (
			<FiltersContainer {...this.props}>
				<FilterInnerContainer>
					{this.props.currentBreakpoint < 1 && (
						<MobileFiltersHeader>
							<TextBlock size="m" bold>
								Filtry
							</TextBlock>
							<CloseIconContainer onClick={this.props.toggleFilters}>
								<FontAwesomeIcon icon="times" />
							</CloseIconContainer>
						</MobileFiltersHeader>
					)}

					<Section>
						<AlgoliaRefinementList
							tab={TABS.category}
							openTab={this.state.openTab}
							toggle={this.toggleTab}
							attribute="category"
						/>
					</Section>

					<Section>
						{/* showMore is required by algolia to display a full list */}
						<AlgoliaRefinementList
							tab={TABS.designers}
							openTab={this.state.openTab}
							toggle={this.toggleTab}
							attribute="designers"
							searchable
							show={10}
							showMore={true}
							multiColumn
						/>
					</Section>
					<Section>
						<AlgoliaRefinementList
							attribute="size"
							tab={TABS.size}
							openTab={this.state.openTab}
							toggle={this.toggleTab}
							boxGrid
							startFolded
						/>
					</Section>

					<Section>
						<AlgoliaRange
							attribute="price"
							forceClear={this.props.clearFilters}
							tab={TABS.price}
							openTab={this.state.openTab}
							toggle={this.toggleTab}
							startFolded
						/>
					</Section>
					{this.props.authUser && (
						<Section id="saved-filters-filters-section">
							<SavedFilters
								tab={TABS.saved}
								openTab={this.state.openTab}
								toggle={this.toggleTab}
								startFolded
							/>
						</Section>
					)}
				</FilterInnerContainer>
				{this.props.currentBreakpoint < 1 && (
					<ActionsContainer>
						<ButtonContainer noMargin>
							<Button onClick={this.props.toggleFilters} fullWidth primary>
								Gotowe
							</Button>
							<ClearAllFiltersButton
								history={this.props.history}
								onClick={this.props.clearFilters.update}
								fullWidth
							/>
						</ButtonContainer>
					</ActionsContainer>
				)}
			</FiltersContainer>
		)
	}
}

export default compose(
	withRouter,
	withBreakpoints,
	withAuthentication
)(Filters)
