import React, { useState } from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import UserPreview from "../UserPreview"
import Button, { ButtonContainer, LoaderButton } from "../Button"
import { Separator } from "../Basics"
import { SmallTextBlock, HorizontalContainer, TextBlock } from "../StyledComponents"
import DataDisplay from "../DataDisplay"

import {
	DetailsContainer,
	OuterContainer,
	Image,
	ImageContainer
} from "./StyledComponents"

import { ROUTES } from "../../constants"
import { translateCondition } from "../../constants/item_schema"
import { useImage, useFirebase, useAuthentication } from "../../hooks"
import { itemDataHelpers } from "../../utils"

const { formatDesigners, formatPrice, formatSize } = itemDataHelpers

const DetailedItemCard = ({ item, history, isAuthorized }) => {
	const { imageUrl, error: imageError } = useImage(
		item.attachments[item.mainImageIndex],
		"M"
	)
	const [isDeleting, setIsDeleting] = useState(false)
	const firebase = useFirebase()
	const authUser = useAuthentication()

	const deleteItem = async () => {
		setIsDeleting(true)

		// TODO: better confirmation dialog
		let confirmation = window.confirm("Czy na pewno chcesz usunąć ten przedmiot?")

		if (confirmation) {
			try {
				const oldItems = authUser.items

				// Delete the item
				await firebase.item(item.id).delete()

				// Remove the deleted item from user's items
				const items = oldItems.filter((item) => item !== item.id)
				await firebase.currentUser().update({ items })
			} catch (e) {
				alert("Usuwanie nie powiodło się")
			}
		}

		setIsDeleting(false)
	}

	let conditionObj = translateCondition(item.condition)
	let formattedDesigners = formatDesigners(item.designers)
	let formattedPrice = formatPrice(item.price)
	let formattedSize = formatSize(item.size)

	const isImageReady = !!imageUrl && !imageError

	return (
		<OuterContainer>
			<ImageContainer>{isImageReady && <Image url={imageUrl} />}</ImageContainer>
			<DetailsContainer>
				<div>
					<TextBlock uppercase size="m" bold>
						{item.designers && formattedDesigners}
					</TextBlock>
					<TextBlock size="m">{item.name}</TextBlock>
				</div>
				{/* <HeartButton id={item.id} type={TYPE.ITEM} scale={2} /> */}
				<Separator />

				<div>
					<HorizontalContainer gap="3">
						<SmallTextBlock>
							<b>Dodano:&nbsp;</b>
							{moment(item.createdAt).format("D.M.YY o HH:mm")}
						</SmallTextBlock>
						<SmallTextBlock>
							<b>Edytowano:&nbsp;</b>
							{moment(item.createdAt).format("D.M.YY o HH:mm")}
						</SmallTextBlock>
					</HorizontalContainer>
					<DataDisplay>
						<tr>
							<th>Cena</th>
							<td>{formattedPrice}</td>
						</tr>
						<tr>
							<th>Rozmiar</th>
							<td>{formattedSize}</td>
						</tr>
						<tr>
							<th>Stan</th>
							<td>{conditionObj.displayValue}</td>
						</tr>
					</DataDisplay>
				</div>
				<Separator />
				<div>
					{isAuthorized ? (
						<div>
							<ButtonContainer>
								<Button
									fullWidth
									onClick={() => {
										/* This is not an a-tag to allow for programmatic disabling */
										history.push(ROUTES.EDIT_ITEM.replace(":id", item.id))
									}}
									// TODO: make the "Zaczekaj jeszcze show actual remaining time"
									title="Przedmiot może być edytowany dopiero po 24 godzinach.
Zaczekaj jeszcze: --"
								>
									Edytuj
								</Button>
								<LoaderButton
									isLoading={isDeleting}
									text="Usuń"
									loadingText="Usuwanie..."
									onClick={deleteItem}
									fullWidth
								/>
							</ButtonContainer>
							<ButtonContainer>
								<Button accent fullWidth>
									Promuj (Bump)
								</Button>
							</ButtonContainer>
						</div>
					) : (
						<UserPreview id={item.userId} pictureSize="52px" />
					)}
				</div>
			</DetailsContainer>
		</OuterContainer>
	)
}

export default compose(
	withFirebase,
	withRouter
)(DetailedItemCard)
