import { compose } from "recompose"
import { Route, Switch } from "react-router-dom"

import { withAuthorization, withAuthentication } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import { withFirebase } from "../../components/Firebase"

import { Nav, NavItem } from "./AdminPage.styles"

const AdminPage = ({ routes }) => (
  <>
    <PageContainer>
      <Nav>
        {routes.map(
          (route) =>
            route.isNavigable && (
              <NavItem key={route.path + (route.name ?? "")} to={route.path}>
                {route.name}
              </NavItem>
            )
        )}
      </Nav>
    </PageContainer>
    <Switch>
      {routes.map((route) => (
        <Route
          exact
          path={route.path}
          render={() => <route.component />}
          key={route.path + (route.id ?? "")}
        />
      ))}
    </Switch>
  </>
)

const condition = (authUser) => authUser && authUser.roles.includes("admin")

export default compose(withFirebase, withAuthentication, withAuthorization(condition))(AdminPage)
