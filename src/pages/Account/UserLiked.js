import React, { useState, useEffect } from "react"

import EmptyState, { UserNoLiked } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import ItemsView from "../../components/ItemsView"

import { useFirebase } from "../../hooks"

import { HeaderContainer } from "./Common"

const Header = ({ numItems = 0 }) => {
	return (
		<HeaderContainer>
			Zapisane przedmioty {numItems > 0 && <div className="count">{numItems}</div>}
		</HeaderContainer>
	)
}

const UserSavedItems = ({ user }) => {
	const firebase = useFirebase()
	const [items, setItems] = useState()
	const [error, setError] = useState()

	useEffect(() => {
		const getSavedItems = async () => {
			const { items, error } = await firebase.getUserSavedItems(user)
			setItems(items)
			setError(error)
		}

		getSavedItems()
	}, [user, firebase])

	const numItems = items ? items.length : 0
	const hasItems = numItems > 0
	const isLoading = !items

	return (
		<PageContainer>
			<Header numItems={numItems} />
			{error ? (
				<div>Wystąpił problem, spróbuj odświeżyć stronę</div>
			) : isLoading ? (
				<LoadingSpinner />
			) : hasItems ? (
				<ItemsView items={items} />
			) : (
				<EmptyState state={UserNoLiked} />
			)}
		</PageContainer>
	)
}

export default UserSavedItems
