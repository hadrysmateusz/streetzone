import React, { Component } from "react"
import { compose } from "recompose"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

import EmptyState, { UserNoItems } from "../../components/EmptyState"
import LoadingSpinner from "../../components/LoadingSpinner"
import { withAuthentication } from "../../components/UserSession"
import { withFirebase } from "../../components/Firebase"
import DetailedItemsView from "../../components/DetailedItemsView"
import ItemsView from "../../components/ItemsView"
import Button, { ButtonContainer } from "../../components/Button"
import { InfoBlock } from "../../components/Basics"
import { ROUTES } from "../../constants"

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
		items.reverse()
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
		const { isAuthorized } = this.props

		return (
			<div>
				{isLoading || isFetchingItems ? (
					<LoadingSpinner fixedHeight />
				) : items && items.length > 0 ? (
					isAuthorized ? (
						<DetailedItemsView items={items} isAuthorized={isAuthorized} />
					) : (
						<ItemsView items={items} />
					)
				) : (
					<EmptyState state={UserNoItems} />
				)}
				{isAuthorized && (
					<InfoBlock>
						<h3>
							<FontAwesomeIcon icon="info-circle" /> PROMOWANIE (BUMP-Y)
						</h3>
						<p>
							Promowanie pomaga sprzedawać szybciej i sprawniej, zwiększając widoczność
							twoich przedmiotów.
						</p>
						<ButtonContainer centered noMargin as={Link} to={ROUTES.BUMP_INFO}>
							<Button>DOWIEDZ SIĘ WIĘCEJ</Button>
						</ButtonContainer>
					</InfoBlock>
				)}
			</div>
		)
	}
}

export default compose(
	withFirebase,
	withAuthentication
)(UserItems)
