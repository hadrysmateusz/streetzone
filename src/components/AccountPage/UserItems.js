import React from "react"
import { DetailedItemsView } from "../DetailedItemCard"
import EmptyState, { UserNoItems } from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"

const UserItems = ({ items, isLoading, userIsOwner }) =>
	isLoading ? (
		<LoadingSpinner />
	) : items && items.length > 0 ? (
		<DetailedItemsView items={items} userIsOwner={userIsOwner} />
	) : (
		<EmptyState state={UserNoItems} />
	)

export default UserItems
