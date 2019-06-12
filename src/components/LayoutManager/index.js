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
	background: rgba(255, 0, 0, 0.2);
	border-bottom: 1px solid green;
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

const LayoutContext = createContext()

export const Main = ({ children }) => {
	const layoutContext = useContext(LayoutContext)

	if (!layoutContext) {
		console.error("You can't use <Main> outside of <LayoutManager>")
		return null
	}

	return <MainContainer ref={layoutContext.mainRef}>{children}</MainContainer>
}

export const Sidebar = ({ children }) => {
	const layoutContext = useContext(LayoutContext)

	if (!layoutContext) {
		console.error("You can't use <Sidebar> outside of <LayoutManager>")
		return null
	}

	return (
		<SidebarContainer ref={layoutContext.sidebarRef}>
			{layoutContext.elements.map(({ title, component }) => (
				<SidebarSection title={title}>{component}</SidebarSection>
			))}
		</SidebarContainer>
	)
}

export const LayoutManager = ({ children, availableElements, isRandom, columns }) => {
	const mainRef = useRef()
	const sidebarRef = useRef()

	const limit = 500

	const sidebar = React.Children.toArray(children).find((a) => a.props.availableElements)

	const { elements, loadMore: loadMoreSidebar } = useLoadableElements(
		sidebar.props.availableElements,
		{
			isRandom
		}
	)

	const update = () => {
		const mainHeight = mainRef.current.clientHeight
		const sidebarHeight = sidebarRef.current.clientHeight
		let difference = mainHeight - sidebarHeight
		difference = difference > 0 ? difference : 0

		// TODO: implement a way to load more than one section for when you start reading lower on the page
		// e.g. when refreshing or using a fragment link
		if (difference > 450) {
			loadMoreSidebar()
		}
	}

	const throttledUpdate = throttle(update, limit, { leading: true })

	useEffect(() => {
		window.addEventListener("scroll", throttledUpdate)
		return () => window.removeEventListener("scroll", throttledUpdate)
	}, [])

	const contextValue = { mainRef, sidebarRef, elements }

	return (
		<LayoutContext.Provider value={contextValue}>
			<Layout columns={columns}>{children}</Layout>
		</LayoutContext.Provider>
	)
}
