import React from "react"
import { withRouter, NavLink } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"

import { Text } from "../../../components/StyledComponents"
import { Dropdown } from "../../../components/FormElements"
import Separator from "../../../components/Separator"
import route from "../../../utils/route"

import { SidebarContainer, SectionNavContainer } from "../StyledComponents"

const NavItem = ({ to, name, current }) => {
	return (
		<NavLink to={to}>
			<Text size="l" uppercase bold serif color={current === name ? "black25" : "gray0"}>
				{name}
			</Text>
		</NavLink>
	)
}

const SectionNav = ({ currentSection }) => {
	return (
		<SectionNavContainer>
			<NavItem to={route("BLOG_HOME")} name="Wszystko" current={currentSection} />
			<NavItem to={route("BLOG_ARTICLES")} name="Artykuły" current={currentSection} />
			<NavItem to={route("BLOG_DROPS")} name="Dropy" current={currentSection} />
			<NavItem to={route("BLOG_KNOWLEDGE")} name="Wiedza" current={currentSection} />
		</SectionNavContainer>
	)
}

const Sidebar = ({ match, history, items, currentBreakpoint, slot }) => {
	let currentSection = match.params.section ? match.params.section : "Wszystko"

	let options = [
		{
			label: "sekcje",
			options: ["Wszystko", "Artykuły", "Dropy", "Wiedza"].map((value) => ({
				value: "section-" + value,
				label: value.toUpperCase()
			}))
		}
		// {
		// 	label: "tagi",
		// 	options: Object.values(items).map((a) => ({
		// 		value: "tag-" + a.value[0],
		// 		label: a.value[0]
		// 	}))
		// }
	]

	return (
		<SidebarContainer>
			{currentBreakpoint >= 2 ? (
				<>
					<SectionNav currentSection={currentSection} />
					<Separator spacing="var(--spacing3)" />
					{slot}
					{/* <TagsNav currentSection={currentSection} items={items} /> */}
				</>
			) : (
				<Dropdown
					isSearchable={false}
					placeholder="Wybierz temat"
					options={options}
					onChange={(data) => {
						// const [type, value] = data.value.split("-")
						// if (type === "section") {
						// 	history.push(route("BLOG_SECTION", { section: value }))
						// } else if (type === "tag") {
						// 	history.push(route("BLOG_TAG", { section: currentSection, tag: value }))
						// } else {
						// 	console.log("ERROR")
						// }
					}}
				/>
			)}
		</SidebarContainer>
	)
}

export default compose(
	withRouter,
	withBreakpoints
)(Sidebar)
