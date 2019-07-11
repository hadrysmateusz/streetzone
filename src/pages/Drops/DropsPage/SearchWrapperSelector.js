import React from "react"
import { Switch, Route } from "react-router-dom"

import { StatelessSearchWrapper } from "../../../components/InstantSearchWrapper"

import { route } from "../../../utils"

import sections from "./sections"

const NewestDrops = ({ section, children }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			{children(section)}
		</StatelessSearchWrapper>
	)
}

const UpcomingDrops = ({ section, children }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			{children(section)}
		</StatelessSearchWrapper>
	)
}

const ArchiveDrops = ({ section, children }) => {
	return (
		<StatelessSearchWrapper indexName={section.sortBy} limit={4} filters={section.filter}>
			{children(section)}
		</StatelessSearchWrapper>
	)
}

const SearchWrapperSelector = ({ children }) => {
	return (
		<Switch>
			<Route path={route("DROPS_SECTION", { id: "newest" })}>
				<NewestDrops section={sections.get("newest")}>{children}</NewestDrops>
			</Route>
			<Route path={route("DROPS_SECTION", { id: "upcoming" })}>
				<UpcomingDrops section={sections.get("upcoming")}>{children}</UpcomingDrops>
			</Route>
			<Route path={route("DROPS_SECTION", { id: "archive" })}>
				<ArchiveDrops section={sections.get("archive")}>{children}</ArchiveDrops>
			</Route>
		</Switch>
	)
}

const withDropsSearchWrapper = (C) => (props) => (
	<SearchWrapperSelector>
		{(currentSection) => <C {...props} currentSection={currentSection} />}
	</SearchWrapperSelector>
)

export default withDropsSearchWrapper
