import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"

import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import useFirebase from "../../../hooks/useFirebase"
import useFirestoreCollection from "../../../hooks/useFirestoreCollection"
import { ROUTES } from "../../../constants"

import AddPost from "./AddPost"

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: 16px;
	margin: 10px 0;
`

const BlogPost = ({ post }) => {
	const firebase = useFirebase()

	const { id, mainImageURL, title, author, isPromoted, section } = post

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
				{section}
			</TextBlock>
			<TextBlock bold size="l">
				{title}
			</TextBlock>
			{author && <TextBlock color="#666">by {author}</TextBlock>}
			{isPromoted && <TextBlock bold>Is Promoted</TextBlock>}
			<BlogImageContainer>
				<img src={mainImageURL} alt="" />
			</BlogImageContainer>
			<ButtonContainer>
				<Button as={Link} to={ROUTES.ADMIN_BLOG_EDIT.replace(":id", post.id)}>
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
		<div>
			<TextBlock size="xl" bold>
				Blog
			</TextBlock>
			<TextBlock size="m" color="gray0">
				Add post
			</TextBlock>
			<AddPost />
			<TextBlock size="m" color="gray0">
				All posts
			</TextBlock>
			{posts.length > 0 && (
				<div>
					{posts.map((post) => (
						<BlogPost post={post} />
					))}
				</div>
			)}
		</div>
	)
}

export default BlogManagement
