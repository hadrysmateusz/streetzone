import React from "react"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { withRouter } from "react-router"
import { Index } from "react-instantsearch-dom"

import { CONST } from "../../../constants"

import { TextBlock } from "../../../components/StyledComponents"
import { SmallDropCard } from "../../../components/Cards"
import { PageContainer } from "../../../components/Containers"
import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"
import { Results } from "../../../components/Algolia/Helpers"

import Sidebar from "./Sidebar"
import { Layout, Heading } from "./Common"
import { DumbThematicGroup } from "./ThematicGroup"
import InfinitePosts from "../InfinitePostsList"

const BlogTagPage = ({ currentBreakpoint, match }) => {
	const isMobile = currentBreakpoint <= 1

	const { tag } = match.params

	return (
		<>
			<StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX} hitsPerPage={6}>
				<PageContainer>
					<Layout>
						{/* Main Content */}
						<main>
							<Heading>Otagowane: {tag}</Heading>
							<Index indexName={CONST.BLOG_DROP_ALGOLIA_INDEX}>
								<TextBlock size="xl" bold>
									Dropy
								</TextBlock>
								<Results>
									{(results) => (
										<DumbThematicGroup
											results={results}
											hasMore={false}
											component={SmallDropCard}
										/>
									)}
								</Results>
							</Index>
							<Index indexName={CONST.BLOG_POST_ALGOLIA_INDEX}>
								<TextBlock size="xl" bold>
									Artykuły
								</TextBlock>

								<InfinitePosts />
							</Index>
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
