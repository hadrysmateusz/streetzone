import React from "react"

import { CONST } from "../../../constants"
import { TextBlock } from "../../../components/StyledComponents"

import BlogPageTemplate from "./BlogPageTemplate"

import InfinitePosts from "../InfinitePostsList"

const Content = () => {
	return (
		<>
			<TextBlock size="xl" bold>
				Wiedza
			</TextBlock>
			<InfinitePosts />
		</>
	)
}

const BlogHomePage = () => {
	return (
		<BlogPageTemplate
			promotedSectionLimit={2}
			promotedSectionIndex={CONST.BLOG_POST_ALGOLIA_INDEX}
			contentSlot={<Content />}
		/>
	)
}

export default BlogHomePage
