import React, { Component } from "react"
import { NavLink, Route, Switch, Redirect } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import { withFirebase } from "../../components/Firebase"
import MainInfo from "../../components/UserMainInfo"

import {
	TabsNav,
	TabsNavItem,
	TabsNavContainer,
	MainGrid,
	InnerContainer
} from "./StyledComponents"

class OtherAccountPage extends Component {
	state = {
		error: null,
		isLoading: true,
		user: null
	}

	getUserData = async (userId) => {
		const { user, error } = await this.props.firebase.getUserData(userId)
		this.setState({ user, error })
	}

	componentDidMount = async () => {
		try {
			await this.getUserData(this.props.userId)
		} catch (error) {
			this.setState({ error })
		} finally {
			this.setState({ isLoading: false })
		}
	}

	render() {
		if (this.state.error) throw this.state.error

		const { isLoading, user } = this.state
		const { routes, match } = this.props

		const userId = match.params.id
		const isUserOwner = false

		const commonProps = { user, userId, isUserOwner }

		return (
			<MainGrid>
				{!isLoading && user ? (
					<>
						<MainInfo {...commonProps} />
						<InnerContainer>
							<TabsNavContainer>
								<TabsNav>
									{routes.map(
										(route) =>
											(isUserOwner || !route.isProtected) && (
												<TabsNavItem as={NavLink} to={route.path.replace(":id", userId)}>
													{route.label}
												</TabsNavItem>
											)
									)}
								</TabsNav>
							</TabsNavContainer>

							<Switch>
								{routes.map(
									(route) =>
										(isUserOwner || !route.isProtected) && (
											<Route
												exact
												path={route.path}
												render={() => <route.component {...commonProps} />}
											/>
										)
								)}
								{/* If no route matches redirect to items subroute */}
								<Route
									path="*"
									render={() => (
										<Redirect
											to={routes
												.find((r) => r.id === "items")
												.path.replace(":id", userId)}
										/>
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

export default withFirebase(OtherAccountPage)
