import React from "react"
import styled from "styled-components/macro"

import Button, { LinkButton, ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route } from "../../../utils"
import { useDeleteDocument } from "../../../hooks"
import { getImageUrl } from "../../../utils/getImageUrl"

const GradientSwatch = styled.div`
	width: 100%;
	height: 120px;
	background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
	border: 1px dashed gray;
`

const FlexContainer = styled.div`
	display: grid;
	grid-auto-columns: 1fr min-content;
	grid-auto-flow: column;
`

const LogoContainer = styled.div`
	height: 120px;
	width: 120px;
	border: 1px dashed black;
	position: relative;
	z-index: 70;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-image: ${(p) => `url(${p.url})`};
`

const DesignerItemContainer = styled.div`
	margin: var(--spacing2) 0;
	border: 1px solid black;
	padding: var(--spacing2);
`

const DesignerPreview = ({ id, imageRef, label, colorA, colorB }) => {
	const logoUrl = getImageUrl(imageRef, "M")
	const deleteDocument = useDeleteDocument(`designers/${id}`)

	return (
		<DesignerItemContainer>
			<TextBlock size="l" bold>
				{label}
			</TextBlock>
			<FlexContainer>
				<GradientSwatch colorA={colorA} colorB={colorB} />
				<LogoContainer url={logoUrl} />
			</FlexContainer>
			<ButtonContainer>
				<Button danger onClick={deleteDocument}>
					Usuń
				</Button>
				<LinkButton to={route("ADMIN_DESIGNER_EDIT", { id })}>Edytuj</LinkButton>
			</ButtonContainer>
		</DesignerItemContainer>
	)
}

export default DesignerPreview
