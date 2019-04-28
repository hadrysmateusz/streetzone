import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import useFirebase from "../../../hooks/useFirebase"
import useFirestoreCollection from "../../../hooks/useFirestoreCollection"
import { ROUTES } from "../../../constants"
import { PageContainer } from "../../../components/Containers"

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
	margin: var(--spacing2) 0;
`

const BlogPost = ({ post }) => {
	const firebase = useFirebase()

	const {
		id,
		imageUrls,
		mainImageIndex,
		title,
		author,
		excerpt,
		promotedAt,
		category
	} = post

	const mainImageUrl = imageUrls[mainImageIndex]
	const isPromoted = !!promotedAt

	const onDelete = (id) => {
		try {
			const shouldDelete = window.confirm(`Do you really want to delete "${title}"?`)
			if (shouldDelete) {
				firebase.post(id).delete()
			}
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
			{isPromoted && <TextBlock bold>Is Promoted</TextBlock>}
			<TextBlock color="#333">{excerpt}</TextBlock>

			<BlogImageContainer>
				<img src={mainImageUrl} alt="" />
			</BlogImageContainer>
			<ButtonContainer>
				<Button as={Link} to={ROUTES.ADMIN_BLOG_EDIT_POST.replace(":id", post.id)}>
					Edit
				</Button>
				<Button onClick={() => onDelete(id)}>Delete</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

const BlogManagement = () => {
	const posts = useFirestoreCollection("posts")

	return !posts ? (
		<LoadingSpinner fixedHeight />
	) : (
		<PageContainer>
			<TextBlock size="xl" bold>
				Blog
			</TextBlock>

			<ButtonContainer>
				<Button primary big fullWidth as={Link} to={ROUTES.ADMIN_BLOG_ADD_POST}>
					Dodaj posta
				</Button>
				<Button primary big fullWidth as={Link} to={ROUTES.ADMIN_BLOG_ADD_DROP}>
					Dodaj dropa
				</Button>
			</ButtonContainer>

			{posts.length > 0 && (
				<div>
					{posts.map((post) => (
						<BlogPost post={post} />
					))}
				</div>
			)}
		</PageContainer>
	)
}

export default BlogManagement
