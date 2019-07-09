import React from "react"
import { withBreakpoints } from "react-breakpoints"

import { TabsNavContainer, TabLink } from "../../../components/Tabs"

import { route } from "../../../utils"

const SectionTab = withBreakpoints(({ id, title, active, currentBreakpoint }) => {
	const isMobile = +currentBreakpoint <= 1

	return (
		<TabLink to={route("DROPS_SECTION", { id })} active={active} biggerText={!isMobile}>
			{title}
		</TabLink>
	)
})

const SectionSelect = ({ sections, currentSection }) => {
	return (
		<TabsNavContainer>
			{sections.map((section) => (
				<SectionTab
					key={section.id}
					active={currentSection.id === section.id}
					{...section}
				/>
			))}
		</TabsNavContainer>
	)
}

export default SectionSelect
