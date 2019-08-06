import React from "react"

import styled from "styled-components/macro"

import Button, { ButtonContainer, LinkButton } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route } from "../../../utils"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { useFirebase, useDeleteDocument } from "../../../hooks"
import FirebaseImage from "../../../components/FirebaseImage"

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
`

const PostPreview = ({
	id,
	attachments,
	mainImageIndex,
	title,
	author,
	excerpt,
	category,
	isPromoted,
	tags
}) => {
	const firebase = useFirebase()
	const deleteDocument = useDeleteDocument(`posts/${id}`)

	const onPromote = () => {
		try {
			firebase.post(id).update({ isPromoted: !isPromoted })
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	return (
		<BlogPostContainer>
			<TextBlock color="gray0" uppercase>
				{category}
			</TextBlock>
			<TextBlock bold size="l">
				{title}
			</TextBlock>
			<TextBlock color="#666">by {author}</TextBlock>

			{isPromoted && <TextBlock bold>Promowany</TextBlock>}

			<TextBlock color="#333">{excerpt}</TextBlock>

			{tags && <TextBlock color="gray0">{tags.map((tag) => `#${tag} `)}</TextBlock>}

			<FirebaseImage
				storageRef={attachments[mainImageIndex]}
				size="M"
				width="150px"
				height="150px"
			/>
			<ButtonContainer>
				<Button primary onClick={onPromote}>
					{isPromoted ? "Przestań wyróżniać" : "Wyróżnij"}
				</Button>
				<LinkButton to={route("ADMIN_BLOG_EDIT", { id })}>Edytuj</LinkButton>
				<Button danger onClick={deleteDocument}>
					Usuń
				</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

export default PostPreview
