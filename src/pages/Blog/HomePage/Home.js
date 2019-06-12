import React, { useState, useRef, useEffect } from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import throttle from "lodash.throttle"

import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { getCategoryColor } from "../../../style-utils"

import { PageContainer } from "../../../components/Containers"
import { SearchWrapper } from "../../../components/InstantSearchWrapper"
import { SmallDropCard, PostCard } from "../../../components/Cards"
import { ThematicGroup } from "../../../components/ThematicGroup"

import PromotedSection from "./PromotedSection"
import CategoryNav from "./CategoryNav"
import InfinitePosts from "../InfinitePostsList"
import { Layout } from "./Common"
import TagsNav from "./TagsNav"

const ContentContainer = styled.div`
	align-self: start;
`

const SidebarContainer = styled.aside`
	align-self: start;
`

const SidebarHeader = styled.div`
	font-size: var(--font-size--m);
	font-weight: bold;
	margin-bottom: var(--spacing2);

	border-left: 4px solid ${(p) => getCategoryColor(p.category)};
	padding-left: var(--spacing2);
	line-height: 1.3;
`

const SidebarSectionContainer = styled.div`
	background: rgba(255, 0, 0, 0.2);
	border-bottom: 1px solid green;
	min-height: calc(100vh - var(--page-header-height));
	overflow-x: hidden;
`

const SidebarSection = ({ title, children }) => {
	return (
		<SidebarSectionContainer>
			<SidebarHeader>{title}</SidebarHeader>
			<div>{children}</div>
		</SidebarSectionContainer>
	)
}

export const useLoadableElements = (availableElements, options = {}) => {
	// get options
	const isRandom = options.isRandom || false
	const initialLoad = options.initialLoad || true

	// get initialState based on initialLoad option
	const initialArray = initialLoad ? [availableElements[0]] : []

	const [currentElements, setCurrentElements] = useState(initialArray)

	const loadSequential = () => {
		const nextIndex = currentElements.length
		const nextElement = availableElements[nextIndex]

		if (!nextElement) return

		setCurrentElements((currentElements) => {
			const newElements = [...currentElements, nextElement]
			return newElements
		})
	}

	const loadRandom = () => {
		const lastElement = currentElements[currentElements.length - 1] || {}
		let nextElement = {}

		// get next element, if it's the same as last one, try again
		do {
			const numAvailableElements = availableElements.length
			const randomIndex = Math.ceil(Math.random() * (numAvailableElements - 1))

			nextElement = availableElements[randomIndex]
		} while (lastElement.title === nextElement.title)

		setCurrentElements((currentElements) => [...currentElements, nextElement])
	}

	const loadMore = () => {
		console.log("availableElements:", availableElements)
		console.log("before loadMore, elements:", currentElements)
		console.log("loadMore, random:", isRandom)

		if (isRandom) {
			loadRandom()
		} else {
			loadSequential()
		}
	}

	const hasMore = isRandom ? true : availableElements.length > currentElements.length

	return { elements: currentElements, loadMore, hasMore }
}

const LayoutManager = withBreakpoints(
	({ children, availableElements, isRandom, currentBreakpoint }) => {
		const contentRef = useRef()
		const sidebarRef = useRef()

		const limit = 500
		const isMobile = currentBreakpoint <= 1

		const { elements, loadMore: loadMoreSidebar } = useLoadableElements(
			availableElements,
			{ isRandom }
		)

		const update = () => {
			const contentHeight = contentRef.current.clientHeight
			const sidebarHeight = sidebarRef.current.clientHeight
			let difference = contentHeight - sidebarHeight
			difference = difference > 0 ? difference : 0

			console.log(difference)

			if (difference > 450) {
				loadMoreSidebar()
			}
		}
		const throttledUpdate = throttle(update, limit, { leading: true })

		useEffect(() => {
			window.addEventListener("scroll", throttledUpdate)
			return () => window.removeEventListener("scroll", throttledUpdate)
		}, [])

		return (
			<Layout>
				<ContentContainer ref={contentRef}>{children}</ContentContainer>
				{!isMobile && (
					<SidebarContainer ref={sidebarRef}>
						{elements.map(({ title, component }) => (
							<SidebarSection title={title}>{component}</SidebarSection>
						))}
					</SidebarContainer>
				)}
			</Layout>
		)
	}
)

const availableElements = [
	{
		title: "Popularne Tagi",
		component: TagsNav
	},
	{ title: "Cośtam1", component: () => <div>adsf1</div> },
	{ title: "Cośtam2", component: () => <div>adsf2</div> },
	{ title: "Cośtam3", component: () => <div>adsf3</div> }
]

const BlogHomePage = () => {
	return (
		<>
			<PromotedSection />
			<SearchWrapper
				indexName={CONST.BLOG_POST_ALGOLIA_INDEX}
				allowedKeys={["tags"]}
				hitsPerPage={3}
			>
				<PageContainer>
					<LayoutManager availableElements={availableElements}>
						<CategoryNav />
						<ThematicGroup
							index={CONST.BLOG_DROP_ALGOLIA_INDEX}
							title="Nadchodzące Dropy"
							linkTo={route("DROPS")}
							hasMore
							component={SmallDropCard}
						/>
						<ThematicGroup
							index={CONST.BLOG_POST_ALGOLIA_INDEX}
							title="Czyszczenie i Pielęgnacja"
							linkTo={route("BLOG_TAG", {
								tag: "Czyszczenie i Pielęgnacja"
							})}
							hasMore
							refinements={{ tags: ["Czyszczenie", "Pielęgnacja"] }}
							component={PostCard}
						/>
						<InfinitePosts />
					</LayoutManager>
				</PageContainer>
			</SearchWrapper>
		</>
	)
}

export default BlogHomePage
