import { Route, Switch } from "react-router-dom"

import { withAuthorization,isAdmin } from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"

import { Nav, NavItem } from "./AdminPage.styles"

const AdminPage = ({ routes }) => {
  return (
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
}

export default withAuthorization(isAdmin,"Strona tylko dla adminów")(AdminPage)
