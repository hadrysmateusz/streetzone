import React from "react"
import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import moment from "moment"

import Button, { ButtonContainer } from "../../../components/Button"
import { TextBlock } from "../../../components/StyledComponents"

import { route, itemDataHelpers } from "../../../utils"
import { ellipsis } from "../../../style-utils"
import { useImage, useFirebase } from "../../../hooks"

const { formatDesigners } = itemDataHelpers

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const DropContainer = styled.div`
	border: 1px solid black;
	padding: var(--spacing3);
`

const BuyAtLink = styled.a`
	${ellipsis}
	display: block;
`

const BuyAtList = styled.div`
	list-style: none;
	padding: 0;
	margin: 0;
`

const DropPreview = ({
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

	const { imageURL } = useImage(attachments[mainImageIndex], "M")

	const formattedDesigners = formatDesigners(designers)

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
		<DropContainer>
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
					Cena: <b>{price}</b>
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
					<BuyAtList>
						{buyAt.map(({ link, name }) => (
							<BuyAtLink href={link} title={link}>
								{name}
							</BuyAtLink>
						))}
					</BuyAtList>
				</>
			)}

			<TextBlock color="#333">Opis: {description}</TextBlock>

			<BlogImageContainer>
				<img src={imageURL} alt="" />
			</BlogImageContainer>

			<ButtonContainer>
				<Button as={Link} to={route("ADMIN_DROPS_EDIT", { id })}>
					Edytuj
				</Button>
				<Button onClick={() => onDelete(id)}>Usuń</Button>
			</ButtonContainer>
		</DropContainer>
	)
}

export default DropPreview
