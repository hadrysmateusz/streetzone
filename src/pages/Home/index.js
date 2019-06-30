import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import { PageContainer } from "../../components/Containers"
import { SmallItemCard, SmallDropCard, PostCard } from "../../components/Cards"
import PopularDesigners from "../../components/PopularDesigners"

import { CONST } from "../../constants"
import { route } from "../../utils"

import MainCarousel from "./MainCarousel"
import HomeSection from "./HomeSection"
import MarketplacePromoted from "./MarketplacePromoted"

const OuterContainer = styled.div`
	margin-top: calc(-1 * var(--page-header-margin));
`

const StyledLink = styled(Link)`
	color: black;
	font-weight: var(--semi-bold);
	text-decoration: underline;
`

const MarketplaceSection = () => (
	<HomeSection
		header="Tablica"
		body={
			<>
				Kupuj lub sprzedawaj. Poszerzaj swoją kolekcję, lub swój portfel. Zacznij{" "}
				<StyledLink to={route("NEW_ITEM")}>sprzedawać</StyledLink>, lub{" "}
				<StyledLink to={route("MARKETPLACE")}>znajdź coś dla siebie</StyledLink>
			</>
		}
		component={SmallItemCard}
		indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
		route={route("MARKETPLACE")}
		inverse
	/>
)

const DropsSection = () => (
	<HomeSection
		header="Dropy"
		body={
			<>
				Dowiaduj się jako pierwszy o najważniejszych dropach. Otrzymuj powiadomienia, by
				nigdy żadnego nie przegapić. Zobacz{" "}
				<StyledLink to={route("DROPS_SECTION", { id: "upcoming" })}>
					nadchodzące dropy
				</StyledLink>
				, lub sprawdź nasze{" "}
				<StyledLink to={route("DROPS_SECTION", { id: "archive" })}>archiwum</StyledLink>
			</>
		}
		indexName={CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX}
		route={route("DROPS_SECTION", { id: "newest" })}
		component={SmallDropCard}
	/>
)

const BlogSection = () => (
	<HomeSection
		header="Blog"
		body={
			<>
				Artykuły, Newsy, Informacje. Dowiedz się jak czyścić buty i ubrania, nie
				uszkadzając ich. Sprawdź jak rozpoznać fake'a, i{" "}
				<StyledLink to={route("BLOG_HOME")}>wiele więcej</StyledLink>...
			</>
		}
		indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
		route={route("BLOG_HOME")}
		component={PostCard}
		inverse
	/>
)

const HomePage = () => {
	return (
		<OuterContainer>
			<MainCarousel />
			<MarketplaceSection />
			<DropsSection />
			<BlogSection />
			<PageContainer>
				<MarketplacePromoted />
				<PopularDesigners />
			</PageContainer>
		</OuterContainer>
	)
}

export default HomePage
