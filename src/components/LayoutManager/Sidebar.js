import React, { useEffect, useContext, useCallback } from "react"
import styled from "styled-components/macro"
import throttle from "lodash.throttle"

import { getCategoryColor } from "../../style-utils"

import useLoadableElements from "./useLoadableElements"
import getHeightDifference from "./getHeightDifference"
import LayoutContext from "./LayoutContext"

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

const StaticContent = styled.div``

const SidebarSectionContainer = styled.div`
	/* background: rgba(255, 0, 0, 0.2);
	border-bottom: 1px solid green; */

	width: 100%;
	overflow: hidden;
	:not(:last-child) {
		height: calc(100vh - var(--page-header-height));
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

const Sidebar = ({ children, availableElements, isRandom }) => {
	const layoutContext = useContext(LayoutContext)
	if (!layoutContext) {
		console.error("You shouldn't use <Sidebar> outside of <LayoutManager>")
	}
	const { sidebarRef, mainRef, isMobile } = layoutContext

	const { elements, loadMore } = useLoadableElements(availableElements, { isRandom })

	// TODO: this value might get stale if the window is resized
	const sectionHeight = window.innerHeight

	const update = useCallback(() => {
		const difference = getHeightDifference(mainRef, sidebarRef)
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
			<StaticContent>{children}</StaticContent>
			{elements.map(({ title, component: C }, i) => (
				<SidebarSection title={title} key={i}>
					<C />
				</SidebarSection>
			))}
		</SidebarContainer>
	)
}

export default Sidebar
