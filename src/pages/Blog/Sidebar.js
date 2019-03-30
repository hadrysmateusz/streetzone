import React from "react"
import { withRouter, NavLink } from "react-router-dom"

import {
	SidebarContainer,
	TagsNavContainer,
	SectionNavContainer
} from "./StyledComponents"
import { ROUTES } from "../../constants"
import { connectRefinementList } from "react-instantsearch-dom"
import { Text } from "../../components/StyledComponents"
import { compose } from "recompose"

const BlogNavSmart = compose(
	withRouter,
	connectRefinementList
)(({ match, items }) => {
	return items.map((item) => {
		let currentSection = match.params.section ? match.params.section : "Wszystko"
		let route = ROUTES.BLOG_TAG.replace(":section", currentSection).replace(
			":tag",
			encodeURIComponent(item.value)
		)

		return (
			<NavLink to={route}>
				{item.label}{" "}
				<Text italic color="gray0">
					({item.count})
				</Text>
			</NavLink>
		)
	})
})

const TagsNav = () => {
	return (
		<TagsNavContainer>
			<BlogNavSmart attribute="tags" />
		</TagsNavContainer>
	)
}

const SectionNav = () => {
	return (
		<SectionNavContainer>
			<NavLink to={ROUTES.BLOG_HOME}>
				<Text size="l" uppercase bold serif color="gray0">
					Wszystko
				</Text>
			</NavLink>
			<NavLink
				to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Artykuły"))}
			>
				<Text size="l" uppercase bold serif color="gray0">
					Artykuły
				</Text>
			</NavLink>
			<NavLink to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Dropy"))}>
				<Text size="l" uppercase bold serif color="gray0">
					Dropy
				</Text>
			</NavLink>
			<NavLink to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Wiedza"))}>
				<Text size="l" uppercase bold serif color="gray0">
					Wiedza
				</Text>
			</NavLink>
		</SectionNavContainer>
	)
}

const Sidebar = ({ history }) => {
	return (
		<SidebarContainer>
			{/* <BasicRefinementList attribute="tags" /> */}
			<SectionNav />
			<TagsNav />
		</SidebarContainer>
	)
}

export default withRouter(Sidebar)
