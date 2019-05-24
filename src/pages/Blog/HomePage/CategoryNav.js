import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { POST_CATEGORIES } from "../../../constants"
import { route } from "../../../utils"
import { getCategoryColor } from "../../../style-utils"

const Container = styled.nav`
	display: flex;
	flex-wrap: wrap;

	margin-bottom: var(--spacing4);
`

const CategoryLink = styled(Link)`
	border-bottom: 2px solid ${(p) => getCategoryColor(p.category)};
	padding: var(--spacing1) 0;
	text-transform: uppercase;
	:not(:last-child) {
		margin-right: var(--spacing3);
	}
`

const CategoryNav = () => {
	return (
		<Container>
			{Object.values(POST_CATEGORIES).map((category) => (
				<CategoryLink category={category} to={route("BLOG_CATEGORY", { category })}>
					{category}
				</CategoryLink>
			))}
		</Container>
	)
}

export default CategoryNav
