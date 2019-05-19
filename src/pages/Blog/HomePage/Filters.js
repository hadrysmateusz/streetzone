import React, { forwardRef, useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cloneDeep from "clone-deep"

import {
	FiltersContainer,
	FilterInnerContainer,
	CloseIconContainer,
	Section,
	ActionsContainer,
	MobileFiltersHeader
} from "../../../components/Filters/StyledComponents"
import { ButtonContainer } from "../../../components/Button"
import AlgoliaRefinementList from "../../../components/Algolia/AlgoliaRefinementList"
import Button from "../../../components/Button"
import { withAuthentication } from "../../../components/UserSession"
import { TextBlock } from "../../../components/StyledComponents"

const TABS = {
	category: {
		displayName: "Kategoria",
		id: "category",
		isDefault: true
	},
	designers: {
		displayName: "Projektanci",
		id: "designers"
	}
}

const useTabs = (tabs, defaultTab) => {
	const _tabs = Object.freeze(cloneDeep(tabs))

	const [openTab, setOpenTab] = useState(_tabs[defaultTab].id)

	const switchTab = (tabId) => setOpenTab(_tabs[tabId])

	return [openTab, switchTab, _tabs]
}

const Filters = forwardRef(({ toggle, currentBreakpoint }, ref) => {
	const [openTab, switchTab, tabs] = useTabs(TABS, "category")

	const isMobile = currentBreakpoint < 1

	return (
		<FiltersContainer>
			<FilterInnerContainer>
				{isMobile && (
					<MobileFiltersHeader>
						<TextBlock size="m" bold>
							Filtry
						</TextBlock>
						<CloseIconContainer onClick={toggle}>
							<FontAwesomeIcon icon="times" />
						</CloseIconContainer>
					</MobileFiltersHeader>
				)}

				<Section>
					<AlgoliaRefinementList
						tab={tabs.category}
						openTab={openTab}
						toggle={switchTab}
						attribute="category"
					/>
				</Section>

				<Section>
					{/* showMore is required by algolia to display a full list */}
					<AlgoliaRefinementList
						tab={tabs.designers}
						openTab={openTab}
						toggle={switchTab}
						attribute="designers"
						show={10}
						showMore={true}
						multiColumn
					/>
				</Section>
			</FilterInnerContainer>

			{isMobile && (
				<ActionsContainer>
					<ButtonContainer noMargin>
						<Button onClick={toggle} fullWidth primary>
							Gotowe
						</Button>
					</ButtonContainer>
				</ActionsContainer>
			)}
		</FiltersContainer>
	)
})

export default compose(
	withRouter,
	withBreakpoints,
	withAuthentication
)(Filters)
