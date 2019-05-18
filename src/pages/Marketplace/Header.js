import React from "react"
import { connectCurrentRefinements, connectStats } from "react-instantsearch-dom"
import { compose } from "recompose"
import styled from "styled-components/macro"

import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"
import { useDesigner } from "../../hooks"

const OuterContainer = styled.div`
	height: 140px;
	background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
	> * {
		height: 100%;
	}
	margin-bottom: var(--spacing3);
`

const Logo = styled.img`
	height: 100%;
	max-height: 100%;
`

const InnerContainer = styled.div`
	height: 100%;
	padding: var(--spacing3) 0;
	display: flex;
	> * + * {
		margin-left: var(--spacing3);
	}
	color: white;
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.26);
	align-items: center;
`

const Header = compose(
	connectStats,
	connectCurrentRefinements
)(({ items, nbHits }) => {
	const appliedFilters = items
	const selectedDesigners = appliedFilters.find(
		(filter) => filter.attribute === "designers"
	)
	const designerList = selectedDesigners ? selectedDesigners.currentRefinement : null
	const hasOneDesigner = designerList && designerList.length === 1
	const selectedDesigner = hasOneDesigner ? designerList[0] : null

	const designer = useDesigner(selectedDesigner)

	return designer ? (
		<OuterContainer {...designer}>
			<PageContainer noMargin>
				<InnerContainer>
					{/* <LogoContainer url={designer.logoURL} /> */}
					<Logo src={designer.logoURL} alt={`logo ${designer.label}`} />
					<div className="info-container">
						<TextBlock size="l" bold color="white">
							{designer.label}
						</TextBlock>
						<TextBlock>
							<b>{nbHits}</b> przedmiotów
						</TextBlock>
					</div>
				</InnerContainer>
			</PageContainer>
		</OuterContainer>
	) : null
})

export default Header
