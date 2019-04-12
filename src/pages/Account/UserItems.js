import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import EmptyState, { UserNoItems } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import DetailedItemsView from "../../components/DetailedItemsView"
import ItemsView from "../../components/ItemsView"
import Button, { ButtonContainer } from "../../components/Button"
import { InfoBlock } from "../../components/Basics"
import { ROUTES } from "../../constants"

const UserItems = ({ user, userId, isAuthorized, firebase }) => {
	const [items, setItems] = useState(null)
	const [error, setError] = useState(null)

	const getItems = async () => {
		let { items, error } = await firebase.getUserItems(user)
		setItems(items.reverse())
		setError(error)
	}

	useEffect(() => {
		getItems()
	}, [user, userId, isAuthorized])

	const isLoading = !items
	const isEmpty = items && items.length === 0

	if (error) return <div>Wystąpił błąd, spróbuj odświeżyć stronę</div>

	if (isLoading) return <LoadingSpinner />

	if (isEmpty) return <EmptyState state={UserNoItems} />

	return isAuthorized ? (
		<>
			<DetailedItemsView items={items} isAuthorized={isAuthorized} />
			<InfoBlock>
				<h3>
					<FontAwesomeIcon icon="info-circle" /> PROMOWANIE (BUMP-Y)
				</h3>
				<p>
					Promowanie pomaga sprzedawać szybciej i sprawniej, zwiększając widoczność twoich
					przedmiotów.
				</p>
				<ButtonContainer centered noMargin as={Link} to={ROUTES.BUMP_INFO}>
					<Button>DOWIEDZ SIĘ WIĘCEJ</Button>
				</ButtonContainer>
			</InfoBlock>
		</>
	) : (
		<ItemsView items={items} />
	)
}

export default withFirebase(UserItems)
