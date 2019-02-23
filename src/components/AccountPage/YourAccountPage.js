import React, { Component } from "react"
import { compose } from "recompose"
import { Route, Switch, Redirect } from "react-router-dom"

import { withFirebase } from "../Firebase"
import { withAuthorization } from "../UserSession"
import LoadingSpinner from "../LoadingSpinner"
import { StyledNavLink } from "../Basics"
import MainInfo from "../UserMainInfo"
import {
	TabsNav,
	TabsNavItem,
	TabsNavContainer,
	MainGrid,
	InnerContainer
} from "./StyledComponents"

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

		const { isLoading, isFetchingItems, availableItems } = this.state
		const { routes, match, authUser } = this.props

		const userId = authUser.uid
		const baseUrl = match.path.replace(":id", userId)

		return (
			<MainGrid>
				{!isLoading ? (
					<>
						<MainInfo user={authUser} userIsOwner />
						<InnerContainer>
							<TabsNavContainer>
								<TabsNav>
									<TabsNavItem>
										<StyledNavLink to={routes.items.path.replace(":id", userId)}>
											{routes.items.label}
										</StyledNavLink>
									</TabsNavItem>

									<TabsNavItem>
										<StyledNavLink to={routes.liked.path.replace(":id", userId)}>
											{routes.liked.label}
										</StyledNavLink>
									</TabsNavItem>

									<TabsNavItem>
										<StyledNavLink to={routes.following.path.replace(":id", userId)}>
											{routes.following.label}
										</StyledNavLink>
									</TabsNavItem>

									<TabsNavItem>
										<StyledNavLink to={routes.feedback.path.replace(":id", userId)}>
											{routes.feedback.label}
										</StyledNavLink>
									</TabsNavItem>

									<TabsNavItem>
										<StyledNavLink to={routes.settings.path.replace(":id", userId)}>
											{routes.settings.label}
										</StyledNavLink>
									</TabsNavItem>
								</TabsNav>
							</TabsNavContainer>

							<Switch>
								<Route
									exact
									path={routes.items.path}
									render={() => (
										<routes.items.component
											items={availableItems}
											isLoading={isFetchingItems}
											userIsOwner
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
									render={() => <routes.feedback.component userIsOwner />}
								/>

								<Route
									exact
									path={routes.following.path}
									render={() => <routes.following.component authUser={authUser} />}
								/>
								<Route
									exact
									path={routes.liked.path}
									render={() => <routes.liked.component authUser={authUser} />}
								/>
								<Route
									path={baseUrl}
									render={() => (
										<Redirect to={routes.items.path.replace(":id", userId)} />
									)}
								/>
							</Switch>
						</InnerContainer>
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
