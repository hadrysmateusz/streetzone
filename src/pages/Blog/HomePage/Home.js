import React from "react"
import { Configure } from "react-instantsearch-dom"

import { CONST } from "../../../constants"
import route from "../../../utils/route"

import { UncontrolledInstantSearchWrapper } from "../../../components/InstantSearchWrapper"
import { VirtualToggle, VirtualMenu } from "../../../components/Algolia/Virtual"
import { Results } from "../../../components/Algolia/Helpers"

import BlogPageTemplate from "./BlogPageTemplate"
import Group from "./Group"
import TagsNav from "./TagsNav"

import InfinitePosts from "../InfinitePostsList"
import { TagsNavContainer } from "../StyledComponents"
import { DropPost, SmallPost } from "../Previews"

const ThematicGroup = ({
	limit = 3,
	index,
	title,
	refinements,
	linkTo,
	component: C
}) => {
	return (
		<UncontrolledInstantSearchWrapper indexName={index}>
			<Configure hitsPerPage={limit} />
			<VirtualToggle attribute="isArchived" defaultRefinement={false} />
			{refinements && refinements}

			<Results>
				{(results) =>
					results && results.length > 0 ? (
						<Group title={title} hasMore linkTo={linkTo}>
							{results.map((res) => (
								<C {...res} />
							))}
						</Group>
					) : null
				}
			</Results>
		</UncontrolledInstantSearchWrapper>
	)
}

const Content = () => {
	return (
		<>
			<ThematicGroup
				index={CONST.BLOG_DROP_ALGOLIA_INDEX}
				title="Nadchodzące Dropy"
				linkTo={route("BLOG_DROPS")}
				component={DropPost}
			/>
			<ThematicGroup
				index={CONST.BLOG_DROP_ALGOLIA_INDEX}
				title="Czyszczenie i Pielęgnacja"
				linkTo={route("BLOG_ARTICLES", null, { tag: "Czyszczenie i Pielęgnacja" })}
				component={SmallPost}
				refinements={
					<>
						<VirtualMenu attribute="tags" defaultRefinement="Czyszczenie i Pielęgnacja" />
					</>
				}
			/>
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
