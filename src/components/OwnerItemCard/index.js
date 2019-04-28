import React, { useState } from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"

import Button, { ButtonContainer, LoaderButton } from "../Button"
import { Separator } from "../Basics"
import { SmallTextBlock, HorizontalContainer, TextBlock } from "../StyledComponents"
import SingleValueDisplay from "../SingleValueDisplay"

import { ROUTES } from "../../constants"
import { translateCondition } from "../../constants/item_schema"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"
import { useFirebase, useImage, useAuthentication } from "../../hooks"

import { MainContainer, OuterContainer, Image, ImageContainer } from "./StyledComponents"

const OwnerItemCard = ({ item, history }) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [imageUrl, imageError] = useImage(item.attachments[item.mainImageIndex])

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
			<MainContainer>
				<div>
					<TextBlock uppercase size="m" bold>
						{item.designers && formattedDesigners}
					</TextBlock>
					<TextBlock size="m">{item.name}</TextBlock>
				</div>

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
					<HorizontalContainer gap="4" style={{ marginTop: "var(--spacing2)" }}>
						<SingleValueDisplay title="Cena">{formattedPrice}</SingleValueDisplay>
						<SingleValueDisplay title="Rozmiar">{formattedSize}</SingleValueDisplay>
						<SingleValueDisplay title="Stan">
							{conditionObj.displayValue}
						</SingleValueDisplay>
					</HorizontalContainer>
				</div>

				<div>
					<ButtonContainer>
						<Button accent fullWidth>
							Promuj
						</Button>
						<Button
							fullWidth
							onClick={() => {
								/* This is not an a-tag to allow for programmatic disabling */
								history.push(ROUTES.EDIT_ITEM.replace(":id", item.id))
							}}
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
				</div>
			</MainContainer>
		</OuterContainer>
	)
}

export default withRouter(OwnerItemCard)
