import React, { Component } from "react"
import { compose } from "recompose"

import EmptyState, { UserNoLiked } from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import { DetailedItemsView } from "../DetailedItemCard"

class UserLiked extends Component {
	state = {
		isLoading: true,
		isFetchingItems: false,
		items: [],
		error: null
	}

	getUserItems = async (user) => {
		this.setState({ isFetchingItems: true })

		// get savedItems' data from firestore
		let items = await Promise.all(
			user.savedItems.map((itemId) => this.props.firebase.getItemData(itemId))
		)

		// filter out items that don't exist anymore
		items = items.filter((item) => Object.keys(item).length)

		// put available items first
		items = items.sort((item) => item.available)

		this.setState({ items, isFetchingItems: false })
	}

	componentDidMount = async () => {
		try {
			this.getUserItems(this.props.authUser)
		} catch (error) {
			this.setState({ error })
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		if (this.state.error) throw this.state.error
		const { isLoading, isFetchingItems, items } = this.state

		return isLoading || isFetchingItems ? (
			<LoadingSpinner />
		) : items && items.length > 0 ? (
			<DetailedItemsView items={items} />
		) : (
			<EmptyState state={UserNoLiked} />
		)
	}
}

export default compose(
	withFirebase,
	withAuthentication
)(UserLiked)
