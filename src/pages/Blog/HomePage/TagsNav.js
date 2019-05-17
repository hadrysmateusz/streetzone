import React from "react"
import { NavLink } from "react-router-dom"
import { compose } from "recompose"
import { connectRefinementList } from "react-instantsearch-dom"

import { Text } from "../../../components/StyledComponents"

import route from "../../../utils/route"
import { withProps } from "../../../HOCs"

const TagsNav = ({ items }) => {
	return items.map((item) => {
		let to = route("BLOG_ARTICLES", null, { tag: item.value })

		return (
			<NavLink to={to}>
				{item.label}{" "}
				<Text italic color="gray0">
					({item.count})
				</Text>
			</NavLink>
		)
	})
}

export default compose(
	withProps({ attribute: "tags" }),
	connectRefinementList
)(TagsNav)
