import React, { useState, useEffect } from "react"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ItemsView from "../../components/ItemsView"
import EmptyState from "../../components/EmptyState/new"

import { useFirebase } from "../../hooks"

import { HeaderContainer } from "./Common"

const Header = ({ numItems = 0 }) => {
	return (
		<HeaderContainer>
			Zapisane przedmioty <div className="count">{numItems}</div>
		</HeaderContainer>
	)
}

const UserSavedItems = ({ user }) => {
	const firebase = useFirebase()
	const [items, setItems] = useState(null)
	const [error, setError] = useState(null)

	const userId = user.uid
	const itemIds = user.savedItems

	// intentionally only include userId as dependency
	// the component shouldn't rerender automatically on unsaving an item
	// this prevents the user from accidentaly unsaving
	useEffect(() => {
		const removeMarkedItems = (ids) => {
			// create new list of ids by removing marked ids
			const newIds = itemIds.filter((id) => !ids.includes(id))

			if (itemIds.length !== newIds.length) {
				// remove marked ids from saved items list
				firebase.user(user.uid).update({ savedItems: newIds })
			}
		}

		const getSavedItems = async () => {
			try {
				let idsToDelete = []
				let items = []

				for (let id of itemIds) {
					// get item document with corresponding id
					const itemDoc = await firebase.item(id).get()

					// mark for deletion and skip if document doesn't exist
					if (!itemDoc.exists) {
						idsToDelete.push(id)
						continue
					}

					// get item data
					const item = itemDoc.data()

					if (item.isArchived) {
						// TODO: handle archived items
						continue
					}

					items.push(item)
				}

				setItems(items)

				removeMarkedItems(idsToDelete)
			} catch (e) {
				setError(e)
				console.log(e)
			}
		}

		getSavedItems()
	}, [userId, firebase])

	const numItems = items ? items.length : 0
	const hasItems = numItems > 0
	const isLoading = !items

	return (
		<PageContainer extraWide>
			<Header numItems={numItems} />
			{error ? (
				<div>Wystąpił problem, spróbuj odświeżyć stronę</div>
			) : isLoading ? (
				<LoadingSpinner />
			) : hasItems ? (
				<ItemsView items={items} />
			) : (
				<EmptyState header="Nie zapisałeś jeszcze żadnego przedmiotu">
					Tutaj znajdziesz zapisane przez siebie przedmioty
				</EmptyState>
			)}
		</PageContainer>
	)
}

export default UserSavedItems
