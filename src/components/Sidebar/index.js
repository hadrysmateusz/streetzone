import React, { useState } from "react"
import styled from "styled-components/macro"
import InfiniteScroll from "react-infinite-scroller"

import LoadingSpinner from "../LoadingSpinner"

import { getCategoryColor } from "../../style-utils"

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
	const [currentElements, setCurrentElements] = useState([])
	const isRandom = options.isRandom || false

	const loadSequential = () => {
		const nextIndex = currentElements.length
		const nextElement = availableElements[nextIndex]

		if (!nextElement) return

		setCurrentElements((currentElements) => [...currentElements, nextElement])
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

	const threshold = options.threshold || 500
	const loaderComponent = options.loaderComponent || <LoadingSpinner />
	const hasMore = isRandom ? true : availableElements.length > currentElements.length
	const loadMore = isRandom ? loadRandom : loadSequential

	const renderElements = () => {
		return (
			<InfiniteScroll
				hasMore={hasMore}
				loader={loaderComponent}
				initialLoad={true}
				loadMore={loadMore}
				threshold={threshold}
			>
				{currentElements.map(({ title, component }) => (
					<SidebarSection title={title}>{component}</SidebarSection>
				))}
			</InfiniteScroll>
		)
	}

	return renderElements
}

const Sidebar = React.forwardRef(
	({ availableElements, children, isRandom, threshold }, ref) => {
		console.log("sidebar ref", ref)
		const renderElements = useLoadableElements(availableElements, { isRandom, threshold })

		return (
			<SidebarContainer ref={ref}>
				{/* Here go static elements which should always be rendered */}
				{children}
				{/* Here go conditionally rendered elements */}
				{renderElements()}
			</SidebarContainer>
		)
	}
)

export default Sidebar
