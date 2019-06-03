import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { route } from "../../utils"

export const TagsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	> :not(:last-child) {
		margin-right: var(--spacing2);
	}
	> * {
		margin-bottom: var(--spacing2);
	}
	margin-bottom: calc(-1 * var(--spacing2));
`

const TagContainer = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	padding: var(--spacing1) var(--spacing2);
	text-align: center;
	text-transform: uppercase;
	font-size: var(--fs-xs);
	white-space: nowrap;
	overflow: hidden;
`

export const Tag = ({ tag }) => {
	return (
		<TagContainer as={Link} to={route("BLOG_TAG", { tag })}>
			{tag}
		</TagContainer>
	)
}

export default ({ tags }) => {
	return (
		<TagsContainer>
			{tags.map((tag) => (
				<Tag tag={tag} />
			))}
		</TagsContainer>
	)
}
