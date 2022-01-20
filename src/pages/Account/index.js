import React, { useState } from "react"
import { Route, Switch, Redirect, withRouter } from "react-router-dom"
import { compose } from "recompose"

import { NotificationsDisabledBar } from "../../components/NotificationsDisabled"
import { withAuthentication } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import HelmetBasics from "../../components/HelmetBasics"

import { useUserData } from "../../hooks"

import MainInfo from "./UserMainInfo"
import { AccountPageTabs } from "./TabsNav"

const AccountPage = ({ routes, match, authUser }) => {
  const [forceRefetch, setForceRefetch] = useState(false)
  const userId = match.params.id
  const isAuthenticated = !!authUser
  const isAuthorized = isAuthenticated && authUser.uid === userId

  const [user, error] = useUserData(userId, authUser, isAuthorized, forceRefetch, setForceRefetch)

  const onForceRefresh = () => {
    setForceRefetch(true)
  }

  if (error) throw error

  const commonProps = { user, userId, isAuthorized, onForceRefresh }

  const pageTitle = isAuthorized ? "Twój profil" : user ? `Profil - ${user.name}` : "Profil"

  return (
    <>
      {isAuthorized && <NotificationsDisabledBar />}

      <HelmetBasics title={pageTitle} />

      {user ? (
        <>
          <MainInfo {...commonProps} />
          <div>
            <AccountPageTabs routes={routes} isAuthorized={isAuthorized} userId={userId} />
            <div className="subroute-container">
              <Switch>
                {routes.map(
                  (route) =>
                    (isAuthorized || !route.isProtected) && (
                      <Route
                        exact
                        path={route.path}
                        render={() => <route.component {...commonProps} />}
                        key={route.path}
                      />
                    )
                )}
                {/* If no route matches redirect to items subroute */}
                <Route
                  path="*"
                  render={() => (
                    <Redirect
                      to={routes.find((r) => r.id === "items").path.replace(":id", userId)}
                    />
                  )}
                />
              </Switch>
            </div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default compose(withAuthentication, withRouter)(AccountPage)
