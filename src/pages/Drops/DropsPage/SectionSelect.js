import React from "react"
import { withRouter, Link } from "react-router-dom"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"
import { compose } from "recompose"

import { route } from "../../../utils"
import { nLinesHigh } from "../../../style-utils"

const SectionCardContainer = styled.div`
	padding: var(--spacing3);
	cursor: pointer;
	background: white;
	:hover {
		background: var(--almost-white);
	}
	border: 1px solid ${(p) => (p.selected ? "var(--black0)" : "var(--gray75)")};

	transition: border-color 350ms ease, background-color 200ms ease;

	.title {
		color: var(--black0);
		text-transform: uppercase;
		font-weight: bold;
		margin-bottom: var(--spacing2);
	}

	.description {
		color: var(--black50);
		${nLinesHigh(3)};
	}
`

const DesktopSectionSelectContainer = styled.div`
	margin: var(--spacing3) 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: var(--spacing3);
`

const MobileSectionSelectContainer = styled.div`
	margin: var(--spacing3) calc(-1 * var(--spacing3));
	display: flex;
	justify-content: space-evenly;
	border-top: 1px solid var(--gray75);
	border-bottom: 1px solid var(--gray75);
`

const MobileSectionItem = styled.div`
	text-transform: uppercase;
	font-weight: bold;
	font-size: var(--fs-xs);
	height: 100%;
	padding: var(--spacing3);
	color: ${(p) => (p.selected ? "var(--black0)" : "var(--gray0)")};
`

const SectionCard = ({ id, title, description, onClick, selected }) => {
	return (
		<SectionCardContainer
			selected={selected}
			as={Link}
			to={route("DROPS_SECTION", { id })}
		>
			<div className="title">{title}</div>
			<div className="description">{description}</div>
		</SectionCardContainer>
	)
}

const DesktopSectionSelect = ({ sections, currentSection, handleChange }) => (
	<DesktopSectionSelectContainer>
		{sections.map((section) => (
			<SectionCard
				key={section.id}
				selected={currentSection.id === section.id}
				{...section}
			/>
		))}
	</DesktopSectionSelectContainer>
)

const MobileSectionSelect = ({ sections, currentSection, handleChange }) => (
	<MobileSectionSelectContainer>
		{sections.map((section) => (
			<MobileSectionItem
				key={section.id}
				selected={currentSection.id === section.id}
				as={Link}
				to={route("DROPS_SECTION", { id: section.id })}
			>
				{section.title}
			</MobileSectionItem>
		))}
	</MobileSectionSelectContainer>
)

const SectionSelect = compose(
	withBreakpoints,
	withRouter
)(({ sections, currentBreakpoint, match, currentSection }) => {
	const isMobile = +currentBreakpoint <= 1

	return isMobile ? (
		<MobileSectionSelect sections={sections} currentSection={currentSection} />
	) : (
		<DesktopSectionSelect sections={sections} currentSection={currentSection} />
	)
})

export default SectionSelect
