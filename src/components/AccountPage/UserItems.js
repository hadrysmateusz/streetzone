import React, { Component } from "react"
import { compose } from "recompose"

import EmptyState, { UserNoItems } from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import DetailedItemsView from "../DetailedItemsView"
import ItemsView from "../ItemsView"

class UserItems extends Component {
	state = {
		isLoading: true,
		isFetchingItems: false,
		items: [],
		error: null
	}

	getUserItems = async () => {
		this.setState({ isFetchingItems: true })
		let { items, error } = await this.props.firebase.getUserItems(this.props.user)
		this.setState({ items, error, isFetchingItems: false })
	}

	componentDidMount = async () => {
		console.log(this.props)
		try {
			this.getUserItems()
		} catch (error) {
			this.setState({ error })
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		if (this.state.error) throw this.state.error
		const { isLoading, isFetchingItems, items } = this.state
		const { isUserOwner } = this.props

		console.log(this.state)

		return isLoading || isFetchingItems ? (
			<LoadingSpinner />
		) : items && items.length > 0 ? (
			isUserOwner ? (
				<DetailedItemsView items={items} isUserOwner={isUserOwner} />
			) : (
				<ItemsView items={items} />
			)
		) : (
			<EmptyState state={UserNoItems} />
		)
	}
}

export default compose(
	withFirebase,
	withAuthentication
)(UserItems)
