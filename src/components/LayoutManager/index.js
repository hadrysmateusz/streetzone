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
		const min = 0
		const max = availableElements.length - 1
		const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
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

	const { sidebarRef, heightDifference, forceUpdateDifference, isMobile } = layoutContext

	// don't render on mobile
	if (isMobile) return null

	const { elements, loadMore } = useLoadableElements(availableElements, { isRandom })

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
			{elements.map(({ title, component: C }, i) => (
				<SidebarSection title={title} key={i}>
					<C />
				</SidebarSection>
			))}
		</SidebarContainer>
	)
}

export const LayoutManager = withBreakpoints(
	({ currentBreakpoint, children, availableElements, isRandom, columns }) => {
		const mainRef = useRef()
		const sidebarRef = useRef()

		const [heightDifference, setHeightDifference] = useState(0)

		const limit = 200
		const isMobile = +currentBreakpoint <= 1
		console.log(currentBreakpoint, isMobile)

		const update = () => {
			// exit if any of the refs are not bound to avoid errors
			if (!mainRef.current || !sidebarRef.current) return

			const mainHeight = mainRef.current.clientHeight
			const sidebarHeight = sidebarRef.current.clientHeight
			let difference = Math.max(mainHeight - sidebarHeight, 0)

			setHeightDifference(difference)
		}

		useEffect(() => {
			const unregister = () => window.removeEventListener("scroll", throttledUpdate)

			// don't listen on mobile
			if (isMobile) return unregister

			const throttledUpdate = throttle(update, limit, { leading: true })

			window.addEventListener("scroll", throttledUpdate)

			return unregister
		}, [mainRef.current, sidebarRef.current])

		const contextValue = {
			mainRef,
			sidebarRef,
			heightDifference,
			isMobile,
			forceUpdateDifference: update
		}

		return (
			<LayoutContext.Provider value={contextValue}>
				<Layout columns={columns}>{children}</Layout>
			</LayoutContext.Provider>
		)
	}
)
