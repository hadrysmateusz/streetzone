import React from "react"
import { NavLink } from "react-router-dom"
import { compose } from "recompose"
import { connectRefinementList } from "react-instantsearch-dom"
import styled from "styled-components/macro"

import route from "../../../utils/route"
import { withProps } from "../../../HOCs"

const Container = styled.div`
	display: grid;
	gap: var(--spacing1);
	align-content: start;
`

const Tag = styled.span`
	color: var(--gray0);
	text-transform: uppercase;
	font-size: var(--font-size--xs);
`

const TagsNav = ({ items }) => {
	return (
		<Container>
			{items.map((item) => {
				let to = route("BLOG_ARTICLES", null, { tag: item.value })

				return (
					<NavLink to={to}>
						<Tag> {item.label}</Tag>
					</NavLink>
				)
			})}
		</Container>
	)
}

export default compose(
	withProps({ attribute: "tags" }),
	connectRefinementList
)(TagsNav)
