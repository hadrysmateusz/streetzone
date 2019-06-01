import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"
import { PageContainer } from "../../../components/Containers"

import { route } from "../../../utils"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { useFirebase, useFirestoreCollection } from "../../../hooks"

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const List = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: 1fr 1fr;

	> * {
		overflow: hidden;
	}
`

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
`

const BlogPost = ({
	id,
	imageUrls,
	mainImageIndex,
	title,
	author,
	excerpt,
	promotedAt,
	category,
	tags
}) => {
	const firebase = useFirebase()

	const mainImageUrl = imageUrls[mainImageIndex]
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

			<BlogImageContainer>
				<img src={mainImageUrl} alt="" />
			</BlogImageContainer>
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

const BlogManagement = () => {
	const posts = useFirestoreCollection("posts")

	const hasPosts = posts && posts.length > 0

	return !posts ? (
		<LoadingSpinner fixedHeight />
	) : (
		<PageContainer>
			<TextBlock size="xl" bold>
				Blog
			</TextBlock>

			<ButtonContainer>
				<Button primary big fullWidth as={Link} to={route("ADMIN_BLOG_ADD")}>
					Dodaj posta
				</Button>
			</ButtonContainer>

			<List>{hasPosts && posts.map((post) => <BlogPost {...post} />)}</List>
		</PageContainer>
	)
}

export default BlogManagement
