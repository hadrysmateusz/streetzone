import React, { Component } from "react"
import { compose } from "recompose"

import EmptyState, { UserNoLiked } from "../EmptyState"
import LoadingSpinner from "../LoadingSpinner"
import { withAuthentication } from "../UserSession"
import { withFirebase } from "../Firebase"
import DetailedItemsView from "../DetailedItemsView"

class UserLiked extends Component {
	state = {
		isLoading: true,
		isFetchingItems: false,
		items: [],
		error: null
	}

	getUserItems = async () => {
		this.setState({ isFetchingItems: true })
		let { items, error } = await this.props.firebase.getUserSavedItems(this.props.user)
		this.setState({ items, error, isFetchingItems: false })
	}

	componentDidMount = async () => {
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
