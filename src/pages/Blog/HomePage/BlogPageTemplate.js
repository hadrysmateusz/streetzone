import React from "react"
import { Configure } from "react-instantsearch-dom"
import styled from "styled-components/macro"

import { PageContainer } from "../../../components/Containers"
import { UncontrolledInstantSearchWrapper } from "../../../components/InstantSearchWrapper"
import { VirtualToggle } from "../../../components/Algolia/Virtual"
import { Results } from "../../../components/Algolia/Helpers"

import InstantSearchBlogWrapper from "../InstantSearchBlogWrapper"
import { MainGrid, ContentArea, PromotedContainer } from "../StyledComponents"
import Sidebar from "./Sidebar"
import PageNav from "../PageNav"
import { PromotedPost } from "../Previews"

const OuterContainer = styled.div`
	padding: var(--spacing3) 0;
`

const PromotedSection = ({ indexName, limit }) => {
	return (
		<OuterContainer>
			<UncontrolledInstantSearchWrapper indexName={indexName}>
				<Configure hitsPerPage={limit} />
				<VirtualToggle attribute="isArchived" defaultRefinement={false} />
				{/* <VirtualToggle attribute="isPromoted" defaultRefinement={true} /> */}
				<PromotedContainer>
					<Results>{(posts) => posts.map((post) => <PromotedPost {...post} />)}</Results>
				</PromotedContainer>
			</UncontrolledInstantSearchWrapper>
		</OuterContainer>
	)
}

const BlogPageTemplate = ({
	promotedSectionLimit,
	promotedSectionIndex,
	sidebarSlot,
	contentSlot
}) => {
	return (
		<PageContainer>
			<InstantSearchBlogWrapper>
				<PromotedSection indexName={promotedSectionIndex} limit={promotedSectionLimit} />
				<PageNav />
				<MainGrid>
					<Sidebar slot={sidebarSlot} />
					<ContentArea>{contentSlot}</ContentArea>
				</MainGrid>
			</InstantSearchBlogWrapper>
		</PageContainer>
	)
}

export default BlogPageTemplate
