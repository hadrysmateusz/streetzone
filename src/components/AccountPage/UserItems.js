import React from "react"
import ItemsView from "../ItemsView"
import EmptyState, { UserNoItems } from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"

const UserItems = ({ items, isLoading }) =>
	isLoading ? (
		<LoadingSpinner />
	) : items && items.length > 0 ? (
		<ItemsView items={items} />
	) : (
		<EmptyState state={UserNoItems} />
	)

export default UserItems
