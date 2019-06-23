import React from "react"
import { NavLink } from "react-router-dom"
import { compose } from "recompose"
import { connectRefinementList } from "react-instantsearch-dom"
import styled from "styled-components/macro"

import route from "../../utils/route"
import { withProps } from "../../HOCs"

const Container = styled.div`
	display: grid;
	align-content: start;
	justify-items: stretch;
`

const Tag = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0;
	padding: var(--spacing1) var(--spacing2);

	color: var(--gray0);
	text-transform: uppercase;
	font-size: var(--font-size--xs);
	transition-property: background, color;
	transition-timing-function: linear;
	transition-duration: 100ms;
	:hover {
		background: var(--gray125);
		border-radius: 4px;
		color: var(--black0);
	}
`

const StyledLink = styled(NavLink)``

const PopularTags = ({ items }) => {
	return (
		<Container>
			{items.map((item) => {
				let to = route("BLOG_TAG", { tag: item.value })

				return (
					<StyledLink to={to} key={item.value}>
						<Tag> {item.label}</Tag>
					</StyledLink>
				)
			})}
		</Container>
	)
}

export default compose(
	withProps({ attribute: "tags" }),
	connectRefinementList
)(PopularTags)
