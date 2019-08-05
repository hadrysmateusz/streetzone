import React from "react"

import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route } from "../../../utils"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { useFirebase } from "../../../hooks"
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
	promotedAt,
	category,
	tags
}) => {
	const firebase = useFirebase()

	const isPromoted = !!promotedAt

	const onDelete = () => {
		try {
			const shouldDelete = window.confirm(`Czy napewno chcesz USUNĄĆ "${title}"?`)
			if (shouldDelete) {
				firebase.post(id).delete()
			}
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	const onPromote = () => {
		try {
			firebase.post(id).update(formatPostDataForDb({}, MODE.PROMOTE, !isPromoted))
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
				<Button as={Link} to={route("ADMIN_BLOG_EDIT", { id })}>
					Edytuj
				</Button>
				<Button onClick={onDelete}>Usuń</Button>
				<Button onClick={onPromote}>{isPromoted ? "Przestań promować" : "Promuj"}</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

export default PostPreview
