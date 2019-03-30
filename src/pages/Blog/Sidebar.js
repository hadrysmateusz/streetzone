import React from "react"
import { withRouter, Link } from "react-router-dom"

import {
	SidebarContainer,
	TagsNavContainer,
	SectionNavContainer
} from "./StyledComponents"
import { ROUTES } from "../../constants"
import { connectRefinementList } from "react-instantsearch-dom"
import { Text } from "../../components/StyledComponents"

const BlogNavSmart = connectRefinementList((props) => {
	return props.items.map((item) => (
		<Link to={ROUTES.BLOG_TAG.replace(":tag", encodeURIComponent(item.value))}>
			{item.label}{" "}
			<Text italic color="gray0">
				({item.count})
			</Text>
		</Link>
	))
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
			<Link to={ROUTES.BLOG_HOME}>
				<Text size="l" uppercase bold serif color="gray0">
					Wszystko
				</Text>
			</Link>
			<Link to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Artykuły"))}>
				<Text size="l" uppercase bold serif color="gray0">
					Artykuły
				</Text>
			</Link>
			<Link to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Dropy"))}>
				<Text size="l" uppercase bold serif color="gray0">
					Dropy
				</Text>
			</Link>
			<Link to={ROUTES.BLOG_SECTION.replace(":section", encodeURIComponent("Wiedza"))}>
				<Text size="l" uppercase bold serif color="gray0">
					Wiedza
				</Text>
			</Link>
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
