import React, { Component } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import LoadingSpinner from "../LoadingSpinner"
import { withFirebase } from "../Firebase"
import { CustomNavLink } from "../Basics"
import { TabsNav, MainGrid } from "./StyledComponents"
import MainInfo from "./MainInfo"
// import getUserItems from "./getUserItems"

class OtherAccountPage extends Component {
	state = {
		error: null,
		isLoading: true,
		user: null,
		userIsOwner: false,
		items: {}
	}

	getUserData = async (userId) => {
		const { user, error } = await this.props.firebase.getUserData(userId)
		this.setState({ user, error })
		return user
	}

	getUserItems = async (user) => {
		this.setState({ isFetchingItems: true })

		const { soldItems, availableItems, error } = await this.props.firebase.getUserItems(
			user
		)

		this.setState({
			error,
			isFetchingItems: false,
			soldItems,
			availableItems
		})
	}

	componentDidMount = async () => {
		try {
			const user = await this.getUserData(this.props.userId)
			await this.getUserItems(user)
		} catch (error) {
			this.setState({ error })
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		if (this.state.error) throw this.state.error

		const { isLoading, isFetchingItems, user, availableItems, soldItems } = this.state
		const { routes, match, userId } = this.props

		const baseUrl = match.path.replace(":id", userId)

		return (
			<MainGrid>
				{!isLoading && user ? (
					<>
						<MainInfo user={user} />

						<TabsNav>
							<CustomNavLink to={routes.items.path.replace(":id", userId)}>
								{routes.items.label}
							</CustomNavLink>

							<CustomNavLink to={routes.feedback.path.replace(":id", userId)}>
								{routes.feedback.label}
							</CustomNavLink>

							<CustomNavLink to={routes.transactions.path.replace(":id", userId)}>
								{routes.transactions.label}
							</CustomNavLink>
						</TabsNav>

						<Switch>
							<Route
								exact
								path={routes.items.path}
								render={() => (
									<routes.items.component
										items={availableItems}
										isLoading={isFetchingItems}
									/>
								)}
							/>
							<Route
								exact
								path={routes.settings.path}
								render={() => <routes.settings.component />}
							/>
							<Route
								exact
								path={routes.feedback.path}
								render={() => <routes.feedback.component />}
							/>
							<Route
								exact
								path={routes.transactions.path}
								render={() => (
									<routes.transactions.component
										items={soldItems}
										isLoading={isFetchingItems}
									/>
								)}
							/>
							<Route
								path={baseUrl}
								render={() => <Redirect to={routes.items.path.replace(":id", userId)} />}
							/>
						</Switch>
					</>
				) : (
					<LoadingSpinner />
				)}
			</MainGrid>
		)
	}
}

export default withFirebase(OtherAccountPage)
