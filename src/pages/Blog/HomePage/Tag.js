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

import Sidebar from "./Sidebar"
import { Layout, Heading } from "./Common"
import InfinitePosts from "../InfinitePostsList"

const Section = styled.div`
	:not(:last-child) {
		margin-bottom: var(--spacing4);
	}
`

const BlogTagPage = ({ currentBreakpoint, match }) => {
	const isMobile = currentBreakpoint <= 1

	const { tag } = match.params

	return (
		<>
			<StatelessSearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				hitsPerPage={6}
				refinements={{ tags: [tag] }}
			>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<PageNav breadcrumbs={[["Czytaj", "BLOG_HOME"]]} />
							<Heading>{tag}</Heading>
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
						</main>
						{/* Sidebar */}
						{!isMobile && <Sidebar />}
					</Layout>
				</PageContainer>
			</StatelessSearchWrapper>
		</>
	)
}

export default compose(
	withBreakpoints,
	withRouter
)(BlogTagPage)
