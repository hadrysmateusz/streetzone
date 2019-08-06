import React from "react"
import styled from "styled-components/macro"

import { Button, ButtonContainer, LinkButton } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"
import FirebaseImage from "../../../components/FirebaseImage"

import { route } from "../../../utils"
import { useDeleteDocument } from "../../../hooks"

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
`

const Preview = ({ id, imageRef, name, about }) => {
	const deleteDocument = useDeleteDocument(`authors/${id}`)

	return (
		<BlogPostContainer>
			<TextBlock bold size="l">
				{name}
			</TextBlock>

			{about && <TextBlock color="#333">{about}</TextBlock>}

			{imageRef && (
				<FirebaseImage storageRef={imageRef} size="M" width="150px" height="150px" />
			)}

			<ButtonContainer>
				<LinkButton to={route("ADMIN_AUTHORS_EDIT", { id })}>Edytuj</LinkButton>
				<Button onClick={deleteDocument}>Usuń</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

export default Preview
