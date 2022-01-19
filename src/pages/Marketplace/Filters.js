import React from "react"

import AlgoliaRefinementList from "../../components/Algolia/AlgoliaRefinementList"
import AlgoliaRange from "../../components/Algolia/AlgoliaRange"
import FiltersBase, { Section } from "../../components/Filters"

export const TABS = {
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

const Filters = ({ toggle, clear, shouldClear }, ref) => {
	return (
		<FiltersBase tabOptions={TABS} defaultTab="category" toggle={toggle} clear={clear}>
			{({ openTab, switchTab, tabs }) => {
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
							<AlgoliaRefinementList
								{...commonProps}
								tab={tabs.designers}
								attribute="designers"
								searchable
								show={5}
								/* showMore is required by algolia to display a full list */
								showMore={true}
							/>
						</Section>

						{/* Size */}
						<Section>
							<AlgoliaRefinementList
								{...commonProps}
								tab={tabs.size}
								attribute="size"
								boxGrid
								startFolded
							/>
						</Section>

						{/* Price */}
						<Section>
							<AlgoliaRange
								{...commonProps}
								tab={tabs.price}
								attribute="price"
								shouldClearFilters={shouldClear}
								startFolded
							/>
						</Section>
					</>
				)
			}}
		</FiltersBase>
	)
}

export default Filters
