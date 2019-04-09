import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withFirebase } from "../Firebase"
import LoadingSpinner from "../LoadingSpinner"

import UserPreview from "../UserPreview"
import { SmallTextBlock } from "../StyledComponents"
import ItemsView from "../ItemsView"
import { UpperGrid } from "./StyledComponents"
import { HeartButton } from "../SaveButton"

const MAX_ITEMS = 3

class FollowedUserCard extends Component {
	state = {
		user: null,
		isLoading: true,
		error: null,
		isFetchingItems: false
	}

	getItems = async () => {
		this.setState({ isFetchingItems: true })

		let items = []
		let error = null

		try {
			const itemIds = this.state.user.items

			// reverse to sort by newest
			itemIds.reverse()

			// get data from firestore
			for (let i = 0; i < Math.min(itemIds.length, MAX_ITEMS); i++) {
				const id = itemIds[i]
				const item = await this.props.firebase.getItemData(id)
				items.push(item)
			}

			// filter out items that don't exist anymore
			items = items.filter((item) => Object.keys(item).length)

			this.setState({ items })
		} catch (e) {
			this.setState({ error })
		} finally {
			this.setState({ isFetchingItems: false })
		}
	}

	getUser = async () => {
		let { id, firebase } = this.props
		let { user, error } = await firebase.getUserData(id)
		this.setState({ user, error, isLoading: false })
	}

	componentDidMount = async () => {
		await this.getUser()
		await this.getItems()
	}

	render() {
		const { isLoading, user, error, items, isFetchingItems } = this.state
		if (!isLoading) {
			return (
				<div>
					<UpperGrid>
						<UserPreview user={user} error={error} id={this.props.id} />
						<HeartButton id={this.props.id} type="user" scale="2" />
					</UpperGrid>
					{!error && (
						<>
							<SmallTextBlock>Najnowsze Przedmioty</SmallTextBlock>
							{!isFetchingItems && items ? (
								<ItemsView items={items} />
							) : (
								<LoadingSpinner fixedHeight />
							)}
						</>
					)}
				</div>
			)
		} else {
			return <LoadingSpinner fixedHeight />
		}
	}
}

export default compose(
	withRouter,
	withFirebase
)(FollowedUserCard)
