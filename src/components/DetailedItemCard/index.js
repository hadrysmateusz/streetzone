import React from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import { ItemCardImage } from "../ItemCard"
import UserPreview from "../UserPreview"
import Button, { ButtonContainer, LoaderButton } from "../Button"
import { Separator } from "../Basics"
import { HeartButton, TYPE } from "../SaveButton"

import { DetailsContainer, OuterContainer } from "./StyledComponents"
import { ROUTES } from "../../constants"
import { translateCondition } from "../../constants/item_schema"
import { SmallTextBlock, HorizontalContainer, TextBlock } from "../StyledComponents"
import DataDisplay from "../DataDisplay"
import formatDesigners from "../../utils/formatDesigners"
import formatPrice from "../../utils/formatPrice"
import formatSize from "../../utils/formatSize"

class DetailedItemCard extends React.Component {
	state = { isDeleting: false }

	deleteItem = async () => {
		// TODO: better confirmation dialog
		let confirmation = window.confirm("Czy napewno chcesz usunąć ten przedmiot?")

		if (confirmation) {
			this.setState({ isDeleting: true })
			try {
				const firebase = this.props.firebase
				const id = this.props.item.id

				// Fetch current user's items from database
				const currentUserSnapshot = await firebase.currentUser().get()
				const oldItems = currentUserSnapshot.data().items

				// Delete the item
				await firebase.item(id).delete()

				// Remove the deleted item from user's items
				const items = oldItems.filter((item) => item !== id)
				await firebase.currentUser().update({ items })

				this.props.history.push("/")
				return
			} catch (e) {
				console.log(e)
				alert("Usuwanie nie powiodło się")
			} finally {
				this.setState({ isDeleting: false })
			}
		}
	}

	render() {
		const { item, isAuthorized, history } = this.props

		let conditionObj = translateCondition(item.condition)
		let formattedDesigners = formatDesigners(item.designers)
		let formattedPrice = formatPrice(item.price)
		let formattedSize = formatSize(item.size)

		return (
			<OuterContainer>
				<ItemCardImage imageId={item.attachments[0]} />
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
										isLoading={this.state.isDeleting}
										text="Usuń"
										loadingText="Usuwanie..."
										onClick={this.deleteItem}
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
}

export default compose(
	withFirebase,
	withRouter
)(DetailedItemCard)
