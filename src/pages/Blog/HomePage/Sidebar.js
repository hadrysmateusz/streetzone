import React from "react"
import { withRouter, NavLink } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"
import { connectRefinementList } from "react-instantsearch-dom"

import { Text } from "../../../components/StyledComponents"
import { Dropdown } from "../../../components/FormElements"
import Separator from "../../../components/Separator"
import route from "../../../utils/route"
import { withProps } from "../../../HOCs"

import {
	SidebarContainer,
	TagsNavContainer,
	SectionNavContainer
} from "../StyledComponents"

const TagsNavSmart = ({ currentSection, items }) => {
	return items.map((item) => {
		let _route = route("BLOG_TAG", { section: currentSection, tag: item.value })

		return (
			<NavLink to={_route}>
				{item.label}{" "}
				<Text italic color="gray0">
					({item.count})
				</Text>
			</NavLink>
		)
	})
}

const TagsNav = ({ ...props }) => {
	return (
		<TagsNavContainer>
			<TagsNavSmart attribute="tags" {...props} />
		</TagsNavContainer>
	)
}

const SectionNav = ({ currentSection }) => {
	return (
		<SectionNavContainer>
			<NavLink to={route("BLOG_HOME")}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Wszystko" ? "black25" : "gray0"}
				>
					Wszystko
				</Text>
			</NavLink>
			<NavLink to={route("BLOG_SECTION", { section: "Artykuły" })}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Artykuły" ? "black25" : "gray0"}
				>
					Artykuły
				</Text>
			</NavLink>
			<NavLink to={route("BLOG_SECTION", { section: "Dropy" })}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Dropy" ? "black25" : "gray0"}
				>
					Dropy
				</Text>
			</NavLink>
			<NavLink to={route("BLOG_SECTION", { section: "Wiedza" })}>
				<Text
					size="l"
					uppercase
					bold
					serif
					color={currentSection === "Wiedza" ? "black25" : "gray0"}
				>
					Wiedza
				</Text>
			</NavLink>
		</SectionNavContainer>
	)
}

const Sidebar = ({ match, history, items, currentBreakpoint }) => {
	let currentSection = match.params.section ? match.params.section : "Wszystko"

	let options = [
		{
			label: "sekcje",
			options: ["Wszystko", "Artykuły", "Dropy", "Wiedza"].map((value) => ({
				value: "section-" + value,
				label: value.toUpperCase()
			}))
		},
		{
			label: "tagi",
			options: Object.values(items).map((a) => ({
				value: "tag-" + a.value[0],
				label: a.value[0]
			}))
		}
	]

	return (
		<SidebarContainer>
			{currentBreakpoint >= 2 ? (
				<>
					<SectionNav currentSection={currentSection} />
					<Separator spacing="var(--spacing3)" />
					<TagsNav currentSection={currentSection} items={items} />
				</>
			) : (
				<Dropdown
					isSearchable={false}
					placeholder="Wybierz temat"
					options={options}
					onChange={(data) => {
						const [type, value] = data.value.split("-")
						if (type === "section") {
							history.push(route("BLOG_SECTION", { section: value }))
						} else if (type === "tag") {
							history.push(route("BLOG_TAG", { section: currentSection, tag: value }))
						} else {
							console.log("ERROR")
						}
					}}
				/>
			)}
		</SidebarContainer>
	)
}

export default compose(
	withProps({ attribute: "tags" }),
	connectRefinementList,
	withRouter,
	withBreakpoints
)(Sidebar)
