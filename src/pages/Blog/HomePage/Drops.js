import React from "react"

import { CONST } from "../../../constants"
import { TextBlock } from "../../../components/StyledComponents"

import PromotedDrop from "../Previews/PromotedDrop"
import BlogPageTemplate from "./BlogPageTemplate"

const Content = () => {
	return (
		<>
			<TextBlock size="xl" bold>
				Dropy
			</TextBlock>
		</>
	)
}

const Sidebar = () => {
	return <div>Filters Placeholder</div>
}

const BlogHomePage = () => {
	return (
		<BlogPageTemplate
			promotedSectionLimit={2}
			promotedSectionIndex={CONST.BLOG_DROP_ALGOLIA_INDEX}
			promotedSectionComponent={PromotedDrop}
			contentSlot={<Content />}
			sidebarSlot={<Sidebar />}
		/>
	)
}

export default BlogHomePage
