import React, { useEffect, useContext, useState } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { compose } from "recompose"

import { withAuthentication } from "../../components/UserSession"
import ErrorBoundary from "../../components/ErrorBoundary"
import { PageContainer } from "../../components/Containers"

import { FirebaseContext } from "../../components/Firebase"
import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import MainInfo from "../../components/UserMainInfo"

import { TabsNav, TabsNavItem, MainContainer } from "./StyledComponents"

const useUserData = (userId, authUser, isAuthorized) => {
	const firebase = useContext(FirebaseContext)
	const [user, setUser] = useState(null)
	const [error, setError] = useState(null)

	const fetchUser = async () => {
		if (isAuthorized) {
			setUser(authUser)
		} else {
			const { user, error } = await firebase.getUserData(userId)
			setUser(user)
			setError(error)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [userId, authUser])

	return [user, error]
}

// const useUserMaintenance = (user, isAuthorized) => {
// 	const firebase = useContext(FirebaseContext)
// 	if (!isAuthorized || !user) return

// 	const fetchUser = async () => {
// 		const savedItems = user.saved

// 		console.log(savedItems)
// 	}

// 	useEffect(() => {
// 		fetchUser()
// 	})
// }

const AccountPage = ({ routes, match, authUser }) => {
	const userId = match.params.id
	const isAuthenticated = !!authUser
	const isAuthorized = isAuthenticated && authUser.uid === userId

	const [user, error] = useUserData(userId, authUser, isAuthorized)
	// useUserMaintenance(user, isAuthorized)

	if (error) throw error

	const commonProps = { user, userId, isAuthorized }

	return (
		<PageContainer>
			<ErrorBoundary>
				<MainContainer>
					{user ? (
						<>
							<MainInfo {...commonProps} />
							<div>
								<TabsNav>
									{routes.map(
										(route, i) =>
											(isAuthorized || !route.isProtected) &&
											route.id !== "settings" && (
												<TabsNavItem to={route.path.replace(":id", userId)} key={i}>
													{route.label}
												</TabsNavItem>
											)
									)}
								</TabsNav>

								<Switch>
									{routes.map(
										(route, i) =>
											(isAuthorized || !route.isProtected) && (
												<Route
													exact
													path={route.path}
													render={() => <route.component {...commonProps} />}
													key={i}
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
							</div>
						</>
					) : (
						<LoadingSpinner />
					)}
				</MainContainer>
			</ErrorBoundary>
		</PageContainer>
	)
}

const condition = (authUser) => !!authUser

export default compose(
	withAuthorization(condition),
	withAuthentication,
	withRouter
)(AccountPage)
