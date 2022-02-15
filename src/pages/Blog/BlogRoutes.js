import { Route, Switch, Redirect, withRouter } from "react-router-dom"

import route from "../../utils/route"

const BlogRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <Route path={route.path} render={() => <route.component />} key={route.path} />
    ))}
    <Route path="*" render={() => <Redirect to={route("BLOG_HOME")} />} />
  </Switch>
)

export default withRouter(BlogRoutes)
