import React, { useState, useRef, useEffect, useContext, createContext } from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import throttle from "lodash.throttle"

import { getCategoryColor } from "../../style-utils"

const MainContainer = styled.div`
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
	/* /* background: rgba(255, 0, 0, 0.2); */
	/* border-bottom: 1px solid green; */
	/* min-height: 400px; */
	min-height: calc(100vh - var(--page-header-height));
	overflow-x: hidden;
`

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		display: grid;
		grid-template-columns: ${(p) => p.columns || "3fr 1fr"};
		gap: var(--spacing3);
	}
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

	const getRandomIndex = () => {
		const numAvailableElements = availableElements.length
		const randomIndex = Math.ceil(Math.random() * (numAvailableElements - 1))
		return randomIndex
	}

	const getInitialState = () => {
		// if there is no initial load return empty array
		if (!initialLoad) return []
		// if the loading is sequential return array with first element
		if (!isRandom) return [availableElements[0]]
		// otherwise return array with random element
		const randomIndex = getRandomIndex()
		return [availableElements[randomIndex]]
	}

	// get initialState based on initialLoad option
	const [currentElements, setCurrentElements] = useState(getInitialState())

	const getSequential = () => {
		const nextIndex = currentElements.length
		const nextElement = availableElements[nextIndex]
		return nextElement
	}

	const getRandom = () => {
		// if there is only one element return it to prevent an infinite loop
		if (availableElements.length === 1) return availableElements[0]

		const lastElement = currentElements[currentElements.length - 1] || {}
		let nextElement = {}

		// get next element, if it's the same as last one, try again
		do {
			const randomIndex = getRandomIndex()
			nextElement = availableElements[randomIndex]
		} while (lastElement.title === nextElement.title)

		return nextElement
	}

	const loadMore = () => {
		const nextElement = isRandom ? getRandom() : getSequential()
		if (!nextElement) return
		setCurrentElements((currentElements) => [...currentElements, nextElement])
	}

	const hasMore = isRandom ? true : availableElements.length > currentElements.length

	return { elements: currentElements, loadMore, hasMore }
}

const LayoutContext = createContext()

export const Main = ({ children }) => {
	const layoutContext = useContext(LayoutContext)

	if (!layoutContext) {
		console.error("You can't use <Main> outside of <LayoutManager>")
		return null
	}

	return <MainContainer ref={layoutContext.mainRef}>{children}</MainContainer>
}

export const Sidebar = ({ children, availableElements, isRandom }) => {
	const layoutContext = useContext(LayoutContext)

	if (!layoutContext) {
		console.error("You can't use <Sidebar> outside of <LayoutManager>")
		return null
	}

	const { elements, loadMore } = useLoadableElements(availableElements, { isRandom })

	const { sidebarRef, heightDifference, forceUpdateDifference } = layoutContext

	const sectionHeight = 400

	useEffect(() => {
		if (heightDifference > sectionHeight) {
			loadMore()
			forceUpdateDifference()
		}
	}, [heightDifference])

	return (
		<SidebarContainer ref={sidebarRef}>
			<div>{children}</div>
			{elements.map(({ title, component: C }) => (
				<SidebarSection title={title}>
					<C />
				</SidebarSection>
			))}
		</SidebarContainer>
	)
}

export const LayoutManager = ({ children, availableElements, isRandom, columns }) => {
	const mainRef = useRef()
	const sidebarRef = useRef()

	const [heightDifference, setHeightDifference] = useState(0)

	const limit = 200

	const update = () => {
		const mainHeight = mainRef.current.clientHeight
		const sidebarHeight = sidebarRef.current.clientHeight
		let difference = Math.max(mainHeight - sidebarHeight, 0)

		console.log("update:", difference)

		setHeightDifference(difference)
	}

	useEffect(() => {
		const throttledUpdate = throttle(update, limit, { leading: true })

		window.addEventListener("scroll", throttledUpdate)

		return () => window.removeEventListener("scroll", throttledUpdate)
	}, [mainRef.current, sidebarRef.current])

	const contextValue = {
		mainRef,
		sidebarRef,
		heightDifference,
		forceUpdateDifference: update
	}

	return (
		<LayoutContext.Provider value={contextValue}>
			<Layout columns={columns}>{children}</Layout>
		</LayoutContext.Provider>
	)
}
