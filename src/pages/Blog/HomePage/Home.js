import React from "react"
import styled from "styled-components/macro"

import { CONST } from "../../../constants"
import route from "../../../utils/route"

import { PageContainer } from "../../../components/Containers"
import { SmallDropCard, SmallItemCard, PostCard } from "../../../components/Cards"

import PromotedSection from "./PromotedSection"
import ThematicGroup from "./ThematicGroup"

const Layout = styled.div`
	display: grid;
	grid-template-columns: 1fr 270px;
`

const BlogHomePage = () => {
	return (
		<>
			<PromotedSection />
			<PageContainer>
				<Layout>
					<main>
						<ThematicGroup
							index={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
							title="Przedmioty Test"
							linkTo={route("BLOG_DROPS")}
							component={SmallItemCard}
						/>
						<ThematicGroup
							index={CONST.BLOG_DROP_ALGOLIA_INDEX}
							title="Nadchodzące Dropy"
							linkTo={route("BLOG_DROPS")}
							component={SmallDropCard}
						/>
						<ThematicGroup
							index={CONST.BLOG_POST_ALGOLIA_INDEX}
							title="Czyszczenie i Pielęgnacja"
							linkTo={route("BLOG_ARTICLES", null, { tag: "Czyszczenie i Pielęgnacja" })}
							refinements={{ tags: ["Czyszczenie", "Pielęgnacja"] }}
							component={PostCard}
						/>
					</main>
					<sidebar />
				</Layout>
			</PageContainer>
		</>
	)
}

export default BlogHomePage
