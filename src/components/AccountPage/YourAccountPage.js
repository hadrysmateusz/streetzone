import React, { Component } from "react"
import { compose } from "recompose"
import { Route, Switch, Redirect } from "react-router-dom"

import { withFirebase } from "../Firebase"
import { withAuthorization } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { CustomNavLink } from "../Basics"
import MainInfo from "./MainInfo"
import { TabsNav, MainGrid } from "./StyledComponents"

class AccountPage extends Component {
	state = {
		error: null,
		isLoading: true,
		isFetchingItems: false,
		soldItems: [],
		availableItems: []
	}

	getUserItems = async (user) => {
		this.setState({ isFetchingItems: true })
		const { soldItems, availableItems, error } = await this.props.firebase.getUserItems(
			user
		)
		this.setState({
			isFetchingItems: false,
			soldItems,
			availableItems,
			error
		})
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

		const { isLoading, isFetchingItems, availableItems, soldItems } = this.state
		const { routes, match, authUser } = this.props

		const userId = authUser.uid
		const baseUrl = match.path.replace(":id", userId)

		return (
			<MainGrid>
				{!isLoading ? (
					<>
						<MainInfo user={authUser} />

						<TabsNav>
							<CustomNavLink to={routes.items.path.replace(":id", userId)}>
								{routes.items.label}
							</CustomNavLink>

							<CustomNavLink to={routes.settings.path.replace(":id", userId)}>
								{routes.settings.label}
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

const condition = (authUser) => !!authUser

export default compose(
	withAuthorization(condition),
	withFirebase
)(AccountPage)
