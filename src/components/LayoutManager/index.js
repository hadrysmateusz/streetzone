import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	createContext,
	useLayoutEffect,
	useCallback
} from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import throttle from "lodash.throttle"

import { getCategoryColor } from "../../style-utils"

const LayoutContext = createContext()

/**
 * Gets height difference between two refs
 */
const getDifference = (refOne, refTwo) => {
	// exit if any of the refs are not bound to avoid errors
	if (!refOne.current || !refTwo.current) {
		console.warn("One of the refs isn't currently bound")
		return 0
	}

	const heightOne = refOne.current.clientHeight
	const heightTwo = refTwo.current.clientHeight
	return Math.max(heightOne - heightTwo, 0)
}

const MainContainer = styled.div`
	align-self: start;
	flex: 1;
`

const SidebarContainer = styled.aside`
	width: 25%;
	min-width: 220px;
	align-self: flex-start;
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
	width: 100%;
	overflow: hidden;
	:not(:last-child) {
		height: calc(100vh - var(--page-header-height));
	}
`

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		> :first-child {
			margin-right: var(--spacing3);
		}

		display: flex;
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

	const getRandomIndex = useCallback(() => {
		const min = 0
		const max = availableElements.length - 1
		const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
		return randomIndex
	}, [availableElements])

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

	const loadMore = useCallback(() => {
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

		const nextElement = isRandom ? getRandom() : getSequential()
		if (!nextElement) return
		setCurrentElements((currentElements) => [...currentElements, nextElement])
	}, [availableElements, currentElements, getRandomIndex, isRandom])

	const hasMore = isRandom ? true : availableElements.length > currentElements.length

	return { elements: currentElements, loadMore, hasMore }
}

export const Main = ({ children }) => {
	const layoutContext = useContext(LayoutContext)

	if (!layoutContext) {
		console.error("You shouldn't use <Main> outside of <LayoutManager>")
	}

	return <MainContainer ref={layoutContext.mainRef}>{children}</MainContainer>
}

export const Sidebar = ({ children, availableElements, isRandom }) => {
	const layoutContext = useContext(LayoutContext)
	if (!layoutContext) {
		console.error("You shouldn't use <Sidebar> outside of <LayoutManager>")
	}
	const { sidebarRef, mainRef, isMobile } = layoutContext

	const { elements, loadMore } = useLoadableElements(availableElements, { isRandom })

	// TODO: this might get stale if the window is resized
	const sectionHeight = window.innerHeight / 2

	const update = useCallback(() => {
		const difference = getDifference(mainRef, sidebarRef)
		if (difference > sectionHeight) {
			loadMore()
		}
	}, [loadMore, mainRef, sectionHeight, sidebarRef])

	useEffect(() => {
		// create cleanup function
		const unregister = () => window.removeEventListener("scroll", throttledUpdate)

		// don't listen on mobile
		if (isMobile) return unregister

		// create throttled version of update function
		const throttleInterval = 200
		const throttledUpdate = throttle(update, throttleInterval, { leading: true })

		// register onScroll listener
		window.addEventListener("scroll", throttledUpdate)

		return unregister
	}, [isMobile, update])

	return isMobile ? null : (
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

export const LayoutManager = withBreakpoints(({ currentBreakpoint, children }) => {
	const mainRef = useRef()
	const sidebarRef = useRef()
	const isMobile = +currentBreakpoint <= 1

	const contextValue = {
		mainRef,
		sidebarRef,
		isMobile
	}

	return (
		<LayoutContext.Provider value={contextValue}>
			<Layout>{children}</Layout>
		</LayoutContext.Provider>
	)
})
