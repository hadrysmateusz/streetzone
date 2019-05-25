import React from "react"
import styled from "styled-components/macro"
import { getCategoryColor } from "../../../style-utils"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"

import TagsNav from "./TagsNav"

const SidebarContainer = styled.aside``

const SidebarHeader = styled.div`
	font-size: var(--font-size--m);
	font-weight: bold;
	margin-bottom: var(--spacing2);

	border-left: 4px solid ${(p) => getCategoryColor(p.category)};
	padding-left: var(--spacing2);
	line-height: 1.3;
`

const SidebarSectionContainer = styled.div``

const SidebarSection = ({ title, children }) => {
	return (
		<SidebarSectionContainer>
			<SidebarHeader>{title}</SidebarHeader>
			<div>{children}</div>
		</SidebarSectionContainer>
	)
}

const Sidebar = () => {
	return (
		<SidebarContainer>
			<PoweredByBox />
			<SidebarSection title="Popularne Tagi">
				<TagsNav />
			</SidebarSection>
		</SidebarContainer>
	)
}

export default Sidebar
