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

const TagsNavSmart = connectRefinementList(({ currentSection, items }) => {
	return items.map((item) => {
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

const TagsNav = ({ currentSection }) => {
	return (
		<TagsNavContainer>
			<TagsNavSmart attribute="tags" currentSection={currentSection} />
		</TagsNavContainer>
	)
}

const SectionNav = ({ currentSection }) => {
	return (
		<SectionNavContainer>
			<NavLink to={ROUTES.BLOG_HOME}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Wszystko" ? "black25" : "gray0"}
				>
					Wszystko
				</Text>
			</NavLink>
			<NavLink
				to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Artykuły"))}
			>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Artykuły" ? "black25" : "gray0"}
				>
					Artykuły
				</Text>
			</NavLink>
			<NavLink to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Dropy"))}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Dropy" ? "black25" : "gray0"}
				>
					Dropy
				</Text>
			</NavLink>
			<NavLink to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Wiedza"))}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Wiedza" ? "black25" : "gray0"}
				>
					Wiedza
				</Text>
			</NavLink>
		</SectionNavContainer>
	)
}

const Sidebar = ({ match }) => {
	let currentSection = match.params.section ? match.params.section : "Wszystko"

	return (
		<SidebarContainer>
			{/* <BasicRefinementList attribute="tags" /> */}
			<SectionNav currentSection={currentSection} />
			<TagsNav currentSection={currentSection} />
		</SidebarContainer>
	)
}

export default withRouter(Sidebar)
