import React from "react"

import Ratio from "react-ratio"
import { Text } from "../../StyledComponents"

import { BoxItem as BoxItemContainer } from "../StyledComponents"

const BoxItem = ({ item, refine }) => {
	console.log(item)
	return (
		<Ratio ratio={1}>
			<BoxItemContainer checked={item.isRefined}>
				<label htmlFor={`filter-value-${item.label}`}>
					<input
						id={`filter-value-${item.label}`}
						type="checkbox"
						checked={item.isRefined}
						value={item.value}
						name={item.label}
						onChange={() => refine(item.value)}
						hidden={true}
					/>
					<Text>{item.label}</Text>
				</label>
			</BoxItemContainer>
		</Ratio>
	)
}

export default BoxItem
