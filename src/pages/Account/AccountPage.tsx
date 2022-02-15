import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"

import { NotificationsDisabledBar } from "../../components/NotificationsDisabled"
import LoadingSpinner from "../../components/LoadingSpinner"
import HelmetBasics from "../../components/HelmetBasics"
import { useAuthentication, useUserData } from "../../hooks"

import { AccountPageTabs, UserMainInfo } from "./HelperComponents"

interface MatchParams {
  id: string
}

// TODO: proper typings for route objects
const AccountPage = ({ routes }: { routes: any[] }) => {
  const match = useRouteMatch<MatchParams>()
  const authUser = useAuthentication()

  const userId = match.params.id
  const isAuthenticated = !!authUser
  const isAuthorized = isAuthenticated && authUser.uid === userId

  const [user, error, forceRefetch] = useUserData(userId)

  const onForceRefresh = () => {
    forceRefetch()
  }

  if (error) throw error

  const pageTitle = isAuthorized
    ? "Twój profil"
    : user
    ? `Profil - ${user.name}`
    : "Profil"

  return (
    <>
      {isAuthorized ? <NotificationsDisabledBar /> : null}

      <HelmetBasics title={pageTitle} />

      {user ? (
        <>
          <UserMainInfo
            user={user}
            userId={userId}
            isAuthorized={isAuthorized}
          />
          <div>
            <AccountPageTabs
              routes={routes}
              isAuthorized={isAuthorized}
              userId={userId}
            />
            <div className="subroute-container">
              <Switch>
                {routes.map((route) => {
                  return isAuthorized || !route.isProtected ? (
                    <Route
                      exact
                      path={route.path}
                      render={() => (
                        <route.component
                          user={user}
                          userId={userId}
                          isAuthorized={isAuthorized}
                          onForceRefresh={onForceRefresh}
                        />
                      )}
                      key={route.path}
                    />
                  ) : null
                })}
                {/* If no route matches redirect to items subroute */}
                <Route
                  path="*"
                  render={() => (
                    <Redirect
                      to={routes
                        .find((route) => route.id === "items")
                        .path.replace(":id", userId)}
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

export default AccountPage
