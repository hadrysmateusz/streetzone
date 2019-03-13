import React from "react"

import Foldable from "../../Foldable"
import { Text } from "../../StyledComponents"

import BoxItem from "./BoxItem"
import {
	FilterItem,
	NoResults,
	OptionsContainer,
	SizeCategoriesContainer
} from "../StyledComponents"

const BoxItemsContainer = ({ title, items, refine }) => {
	return (
		<Foldable title={title} onlyVisual startFolded>
			{items && items.length > 0 ? (
				<OptionsContainer boxGrid>
					{items.map((size) => (
						<BoxItem item={size} refine={refine} />
					))}
				</OptionsContainer>
			) : (
				<NoResults>Brak</NoResults>
			)}
		</Foldable>
	)
}

export const BoxOptionsList = ({ items, refine }) => {
	if (items && items.length > 0) {
		// divide items by category
		let sizes = { top: [], spodnie: [], buty: [] }
		items.forEach((size) => {
			// split the string to get category and value of the size
			const [category, label] = size.label.split("-")
			// push the label to the proper category's array
			sizes[category].push({ ...size, label })
		})

		return (
			<SizeCategoriesContainer>
				<BoxItemsContainer title="Buty" items={sizes.buty} refine={refine} />
				<BoxItemsContainer title="Tee / Longsleeve" items={sizes.top} refine={refine} />
				<BoxItemsContainer title="Spodnie" items={sizes.spodnie} refine={refine} />
			</SizeCategoriesContainer>
		)
	} else {
		return <NoResults>Brak</NoResults>
	}
}

export const OptionsList = ({ items, refine, showCount, multiColumn }) => {
	if (items && items.length > 0) {
		return (
			<OptionsContainer multiColumn={multiColumn}>
				{items.map((item) => (
					<FilterItem key={item.value}>
						<label htmlFor={`filter-value-${item.label}`}>
							<input
								id={`filter-value-${item.label}`}
								type="checkbox"
								checked={item.isRefined}
								value={item.value}
								name={item.label}
								onChange={() => refine(item.value)}
							/>
							<Text>{item.label}</Text> {showCount && <em>({item.count})</em>}
						</label>
					</FilterItem>
				))}
			</OptionsContainer>
		)
	} else {
		return <NoResults>Brak</NoResults>
	}
}

export default OptionsList
