import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import moment from "moment"

import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"
import { PageContainer } from "../../../components/Containers"

import { ROUTES } from "../../../constants"

import formatDesigners from "../../../utils/formatDesigners"
import formatPrice from "../../../utils/formatPrice"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"

import { useImage, useFirebase, useFirestoreCollection } from "../../../hooks"

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const List = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing2);

	.buyAt {
		list-style: none;
		padding: 0;
		margin: 0;
	}
`

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
	margin: var(--spacing2) 0;
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
				<Button as={Link} to={ROUTES.ADMIN_BLOG_EDIT_POST.replace(":id", id)}>
					Edytuj
				</Button>
				<Button onClick={onDelete}>Usuń</Button>
				<Button onClick={onPromote}>{isPromoted ? "Przestań promować" : "Promuj"}</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

const Drop = ({
	id,
	attachments,
	mainImageIndex,
	name,
	description,
	dropsAtString,
	designers,
	price,
	howMany,
	buyAt,
	itemCategory,
	createdAt,
	editedAt
}) => {
	const firebase = useFirebase()

	const [imageURL, error] = useImage(attachments[mainImageIndex])

	const formattedDesigners = formatDesigners(designers)
	const formattedPrice = formatPrice(price)

	const onDelete = (id) => {
		try {
			const shouldDelete = window.confirm(`Czy napewno chcesz USUNĄĆ "${name}"?`)
			if (shouldDelete) {
				firebase.drop(id).delete()
			}
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	return (
		<BlogPostContainer>
			<TextBlock color="gray0" uppercase>
				{itemCategory}
				&nbsp;
				<b>{formattedDesigners}</b>
			</TextBlock>

			<TextBlock bold size="l">
				{name}
			</TextBlock>

			<TextBlock color="gray0" size="xs" uppercase>
				Dodano {moment(createdAt).format("D.M.YY o HH:mm")}
			</TextBlock>

			<TextBlock color="gray0" size="xs" uppercase>
				Edytowano {moment(editedAt).format("D.M.YY o HH:mm")}
			</TextBlock>

			<TextBlock color="black100">
				Data dropu: <b>{dropsAtString}</b>
			</TextBlock>
			{price && (
				<TextBlock color="black100">
					Cena: <b>{formattedPrice}</b>
				</TextBlock>
			)}

			{howMany && (
				<TextBlock color="black100">
					Nakład: <b>{howMany}</b>
				</TextBlock>
			)}

			{buyAt && (
				<>
					<TextBlock color="black100">Gdzie kupić:</TextBlock>
					<ul className="buyAt">
						{buyAt.map((link) => (
							<a href={link}>{link}</a>
						))}
					</ul>
				</>
			)}

			<TextBlock color="#333">Opis: {description}</TextBlock>

			<BlogImageContainer>
				<img src={imageURL} alt="" />
			</BlogImageContainer>

			<ButtonContainer>
				<Button as={Link} to={ROUTES.ADMIN_BLOG_EDIT_POST.replace(":id", id)}>
					Edytuj
				</Button>
				<Button onClick={() => onDelete(id)}>Usuń</Button>
			</ButtonContainer>
		</BlogPostContainer>
	)
}

const BlogManagement = () => {
	const posts = useFirestoreCollection("posts")
	const drops = useFirestoreCollection("drops")

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

			<List>
				{posts && posts.length > 0 && (
					<div>
						{posts.map((post) => (
							<BlogPost {...post} />
						))}
					</div>
				)}
				{drops && drops.length > 0 && (
					<div>
						{drops.map((drop) => (
							<Drop {...drop} />
						))}
					</div>
				)}
			</List>
		</PageContainer>
	)
}

export default BlogManagement
