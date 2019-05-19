import React, { useState, useEffect, useRef } from "react"
import { withBreakpoints } from "react-breakpoints"
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from "body-scroll-lock"

import { CONST } from "../../../constants"
import { TextBlock } from "../../../components/StyledComponents"
import { FiltersToggleButton } from "../../../components/Topbar/FiltersToggle"

import PromotedDrop from "../Previews/PromotedDrop"
import BlogPageTemplate from "./BlogPageTemplate"
import Filters from "./Filters"

const Content = ({ toggleFilters }) => {
	return (
		<>
			<TextBlock size="xl" bold>
				Dropy
			</TextBlock>
		</>
	)
}

const Sidebar = withBreakpoints(({ currentBreakpoint }) => {
	const [areFiltersOpen, setAreFiltersOpen] = useState(currentBreakpoint > 1)
	const [searchState, setSearchState] = useState(null)

	const isMobile = currentBreakpoint === 0

	const toggleFilters = () => {
		// const wasOpen = areFiltersOpen
		// if (wasOpen) {
		// 	enableBodyScroll(this.targetElement)
		// } else {
		// 	disableBodyScroll(this.targetElement)
		// }

		setAreFiltersOpen((state) => !state)
	}

	// if (!isMobile) {
	// 	enableBodyScroll(this.targetElement)
	// }

	return (
		<>
			{isMobile && <FiltersToggleButton onClick={toggleFilters} />}
			<Filters toggle={toggleFilters} />
		</>
	)
})

const BlogHomePage = () => {
	return (
		<BlogPageTemplate
			promotedSectionLimit={2}
			promotedSectionIndex={CONST.BLOG_DROP_ALGOLIA_INDEX}
			promotedSectionComponent={PromotedDrop}
			contentSlot={<Content />}
			sidebarSlot={<Sidebar />}
		/>
	)
}

export default BlogHomePage
