import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { route } from "../../utils"

import { IconContainer, NavContainer } from "./PageNav.styles"

const Chevron = () => <IconContainer>&gt;</IconContainer>

const PageNav = ({ breadcrumbs, showBack = true, white, noMargin }) => {
  const routes = breadcrumbs.map((value) => {
    // Use the first element of the array as the title
    const title = value.shift()

    // Use the rest to construct the path
    const path = route(...value)

    return { title, path }
  })

  const lastRoute = routes[Math.max(0, routes.length - 2)]

  return (
    <NavContainer white={white} noMargin={noMargin}>
      <div className="left">
        {routes.map(({ title, path }, i) => (
          <Link to={path} key={title}>
            {i > 0 && <Chevron />}
            {title}
          </Link>
        ))}
      </div>
      {showBack && (
        <div className="right">
          <FontAwesomeIcon icon="arrow-left" />
          <Link to={lastRoute.path}>Wróć</Link>
        </div>
      )}
    </NavContainer>
  )
}

export default PageNav
