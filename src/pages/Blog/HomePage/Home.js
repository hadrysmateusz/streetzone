import React from "react"

import { CONST } from "../../../constants"

import BlogPageTemplate from "./BlogPageTemplate"
import Group from "./Group"
import TagsNav from "./TagsNav"

import InfinitePosts from "../InfinitePostsList"
import { TagsNavContainer } from "../StyledComponents"

const Content = () => {
	return (
		<>
			<Group />
			<InfinitePosts />
		</>
	)
}

const Sidebar = () => {
	return (
		<TagsNavContainer>
			<TagsNav />
		</TagsNavContainer>
	)
}

const BlogHomePage = () => {
	return (
		<BlogPageTemplate
			promotedSectionLimit={2}
			promotedSectionIndex={CONST.BLOG_POST_ALGOLIA_INDEX}
			contentSlot={<Content />}
			sidebarSlot={<Sidebar />}
		/>
	)
}

export default BlogHomePage
