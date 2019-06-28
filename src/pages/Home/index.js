import React from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { SmallItemCard, SmallDropCard, PostCard } from "../../components/Cards"

import MainCarousel from "./MainCarousel"
import HomeSection from "./HomeSection"

const OuterContainer = styled.div`
	margin-top: calc(-1 * var(--page-header-margin));
`

const cardsDummyData = {
	marketplace: [{ id: 0, name: "Adidas NDM R1" }],
	drops: [{}],
	blog: [{}]
}

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
		data={cardsDummyData.marketplace}
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
		data={cardsDummyData.drops}
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
		component={PostCard}
		data={cardsDummyData.blog}
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
			<PageContainer>Other stuff</PageContainer>
		</OuterContainer>
	)
}

export default HomePage
