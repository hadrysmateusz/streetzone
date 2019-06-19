import React from "react"

import FiltersBase, { Section } from "../../../components/Filters"
import AlgoliaRefinementList from "../../../components/Algolia/AlgoliaRefinementList"

const TABS = {
	category: {
		displayName: "Kategoria",
		id: "category"
	},
	designers: {
		displayName: "Projektanci",
		id: "designers"
	}
}

const Filters = ({ toggle, clear }, ref) => {
	return (
		<FiltersBase tabOptions={TABS} defaultTab="category" toggle={toggle} clear={clear}>
			{({ openTab, switchTab, clearFilters, tabs }) => {
				const commonProps = { openTab, toggle: switchTab }

				return (
					<>
						{/* Category */}
						<Section>
							<AlgoliaRefinementList
								{...commonProps}
								tab={tabs.category}
								attribute="category"
							/>
						</Section>

						{/* Designers */}
						<Section>
							{/* showMore is required by algolia to display a full list */}
							<AlgoliaRefinementList
								{...commonProps}
								tab={tabs.designers}
								attribute="designers"
								show={10}
								showMore={true}
								multiColumn
							/>
						</Section>
					</>
				)
			}}
		</FiltersBase>
	)
}

export default Filters
