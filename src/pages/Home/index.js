import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { SmallItemCard, SmallDropCard, PostCard } from "../../components/Cards"

import { CONST } from "../../constants"

import MainCarousel from "./MainCarousel"
import HomeSection from "./HomeSection"
import MarketplacePromoted from "./MarketplacePromoted"

const OuterContainer = styled.div`
	margin-top: calc(-1 * var(--page-header-margin));
`

const MarketplaceSection = () => (
	<HomeSection
		header="Tablica"
		body={
			<>
				Kupuj lub sprzedawaj. Poszerzaj swoją kolekcję, lub swój portfel. Zacznij
				sprzedawać, lub znajdź coś dla siebie
			</>
		}
		component={SmallItemCard}
		indexName={CONST.ITEMS_MARKETPLACE_DEFAULT_ALGOLIA_INDEX}
		inverse
	/>
)

const DropsSection = () => (
	<HomeSection
		header="Dropy"
		body={
			<>
				Dowiaduj się jako pierwszy o najważniejszych dropach. Otrzymuj powiadomienia, by
				nigdy żadnego nie przegapić. Zobacz nadchodzące dropy, lub sprawdź nasze archiwum
			</>
		}
		indexName={CONST.BLOG_DROP_NEWEST_ALGOLIA_INDEX}
		component={SmallDropCard}
	/>
)

const BlogSection = () => (
	<HomeSection
		header="Blog"
		body={
			<>
				Artykuły, Newsy, Informacje. Dowiedz się jak czyścić buty i ubrania, nie
				uszkadzając ich. Sprawdź jak rozpoznać fake'a, i wiele więcej...
			</>
		}
		indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
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
			</PageContainer>
		</OuterContainer>
	)
}

export default HomePage
