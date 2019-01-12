import React from "react"
import ItemsView from "../ItemsView"
import EmptyState from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"
import { EMPTY_STATES } from "../../constants"

const UserItems = ({ items, isLoading }) =>
	isLoading ? (
		<LoadingSpinner />
	) : items && items.length > 0 ? (
		<ItemsView items={items} />
	) : (
		<EmptyState state={EMPTY_STATES.UserNoItems} />
	)

export default UserItems
