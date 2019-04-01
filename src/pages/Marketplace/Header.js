import React, { useState, useEffect } from "react"
import { connectCurrentRefinements, connectStats } from "react-instantsearch-dom"
import { compose } from "recompose"
import useFirebase from "../../hooks/useFirebase"
import styled from "styled-components"
import { PageContainer } from "../../components/Containers"
import { TextBlock } from "../../components/StyledComponents"

const OuterContainer = styled.div`
	height: 140px;
	background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
	> * {
		height: 100%;
	}
`

const Logo = styled.img`
	height: 100%;
	max-height: 100%;
`

const InnerContainer = styled.div`
	height: 100%;
	padding: var(--spacing3) 0;
	display: grid;
	grid-template-columns: max-content 1fr;
	gap: var(--spacing3);
	color: white;
	text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	align-items: center;
`

const Header = compose(
	connectStats,
	connectCurrentRefinements
)(({ items, nbHits }) => {
	const firebase = useFirebase()
	const [designer, setDesigner] = useState(null)

	const appliedFilters = items
	const selectedDesigners = appliedFilters.find(
		(filter) => filter.attribute === "designers"
	)
	const designerList = selectedDesigners ? selectedDesigners.currentRefinement : null
	const hasOneDesigner = designerList && designerList.length === 1
	const selectedDesigner = hasOneDesigner ? designerList[0] : null

	const getDesigner = async (selectedDesigner) => {
		const snap = await firebase
			.designers()
			.where("label", "==", selectedDesigner)
			.get()

		let designersArr = []
		snap.forEach((a) => {
			designersArr.push(a.data())
		})

		setDesigner(designersArr[0])
	}

	useEffect(() => {
		getDesigner(selectedDesigner)
	}, [selectedDesigner])

	return designer ? (
		<OuterContainer {...designer}>
			<PageContainer>
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
