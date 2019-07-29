import React from "react"
import styled from "styled-components/macro"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { withRouter } from "react-router"

import { CONST } from "../../../constants"

import { SmallDropCard, SmallItemCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { DumbThematicGroup } from "../../../components/ThematicGroup"
import IndexResults from "../../../components/Algolia/IndexResults"
import { ItemsGrid } from "../../../components/ItemsView"
import PageNav from "../../../components/PageNav"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import { PopularArticles, PopularTags } from "../../../components/SidebarComponents"
import HelmetBasics from "../../../components/HelmetBasics"

import { Heading } from "../common"
import InfinitePosts from "../InfinitePostsList"

const Section = styled.div`
	:not(:last-child) {
		margin-bottom: var(--spacing4);
	}
`

const sidebarElements = [
	{ title: "Popularne artykuły", component: PopularArticles },
	{ title: "Popularne tagi", component: PopularTags }
]

const BlogTagPage = ({ currentBreakpoint, location }) => {
	const isMobile = currentBreakpoint <= 1

	const searchParams = new URLSearchParams(location.search)

	const tags = searchParams.has("tags")
		? searchParams.get("tags").split(",")
		: searchParams.has("tag")
		? [searchParams.get("tag")]
		: null

	const numTags = tags.length
	const hasManyTags = numTags > 1
	const headingText = tags[0] + (hasManyTags ? ` i (${numTags - 1}) inne` : "")

	return (
		<StatelessSearchWrapper
			indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
			hitsPerPage={6}
			refinements={{ tags }}
		>
			<HelmetBasics title={headingText + " - Blog"} />
			<PageContainer>
				<LayoutManager>
					<Main>
						<PageNav breadcrumbs={[["Czytaj", "BLOG_HOME"]]} noMargin />
						<Heading>{headingText}</Heading>
						<Section>
							<IndexResults
								indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}
								title="Dropy"
								limit={6}
							>
								{(results) =>
									isMobile ? (
										<DumbThematicGroup results={results} component={SmallItemCard} />
									) : (
										<ItemsGrid>
											{results.map((drop) => (
												<SmallDropCard {...drop} key={drop.id} />
											))}
										</ItemsGrid>
									)
								}
							</IndexResults>
						</Section>

						<Section>
							<IndexResults indexName={CONST.BLOG_POST_ALGOLIA_INDEX} title="Artykuły">
								<InfinitePosts />
							</IndexResults>
						</Section>
					</Main>
					<Sidebar availableElements={sidebarElements} isRandom>
						<PoweredByBox />
					</Sidebar>
				</LayoutManager>
			</PageContainer>
		</StatelessSearchWrapper>
	)
}

export default compose(
	withBreakpoints,
	withRouter
)(BlogTagPage)
