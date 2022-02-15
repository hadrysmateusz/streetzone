import { useState } from "react"
import { withBreakpoints } from "react-breakpoints"

import Overlay from "../../../components/Overlay"
import { PageContainer } from "../../../components/Containers"
import { Submenu } from "../../../components/Basics"

import {
  Nav,
  NavItem,
  StyledNavLink,
  SubmenuContainer,
  SubmenuNavItem,
  SubmenuOuterContainer,
} from "./TabsNav.styles"

const shouldRenderRoute = (route, isAuthorized, isMobile) => {
  return (
    (isAuthorized || !route.isProtected) &&
    (!isMobile || !route.isHiddenOnMobile) &&
    !route.isHidden
  )
}

const DropdownNavItem = ({ label, routes }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <SubmenuOuterContainer>
      <NavItem onClick={onClick}>{label}</NavItem>
      {isOpen ? (
        <>
          <SubmenuContainer>
            <Submenu>
              {routes.map((route) => (
                <SubmenuNavItem
                  to={route.path}
                  key={route.id}
                  onClick={onClick}
                >
                  {route.shortLabel}
                </SubmenuNavItem>
              ))}
            </Submenu>
          </SubmenuContainer>
          <Overlay onClick={onClick} />
        </>
      ) : null}
    </SubmenuOuterContainer>
  )
}

export const AccountPageTabs = withBreakpoints(
  ({ currentBreakpoint, routes, userId, ...rest }) => {
    let routesWithIds = routes.map((route) => {
      return { ...route, path: route.path.replace(":id", userId) }
    })

    const isMobile = currentBreakpoint < 2

    if (isMobile) {
      routesWithIds = routesWithIds.reduce((acc, curr) => {
        if (!curr.category) {
          return { ...acc, [curr.id]: curr }
        } else {
          const categoryArr = acc[curr.category]
            ? [...acc[curr.category], curr]
            : [curr]
          return { ...acc, [curr.category]: categoryArr }
        }
      }, {})
    }

    return <TabsNav routes={routesWithIds} isMobile={isMobile} {...rest} />
  }
)

export const TabsNav = ({ routes, isMobile, isAuthorized = false }) => {
  const routeEntries = Object.entries(routes)

  const renderDropdown = (categoryName, routes) => {
    routes = routes.reduce((acc, route) => {
      return shouldRenderRoute(route, isAuthorized, isMobile)
        ? [...acc, route]
        : acc
    }, [])

    return routes.length > 0 ? (
      <DropdownNavItem
        label={categoryName}
        routes={routes}
        key={categoryName}
      />
    ) : null
  }

  const renderSingleRoute = (route) =>
    shouldRenderRoute(route, isAuthorized, isMobile) ? (
      <StyledNavLink to={route.path} key={route.id}>
        {route.label}
      </StyledNavLink>
    ) : null

  return (
    <PageContainer extraWide>
      <Nav>
        {routeEntries.map(([key, value]) =>
          Array.isArray(value)
            ? renderDropdown(key, value)
            : renderSingleRoute(value)
        )}
      </Nav>
    </PageContainer>
  )
}
