import React, { useState } from "react"
import { withBreakpoints } from "react-breakpoints"

import Overlay from "../../components/Overlay"
import { PageContainer } from "../../components/Containers"
import { Submenu } from "../../components/Basics"

import {
	SubmenuContainer,
	Nav,
	NavItem,
	StyledNavLink,
	OuterContainer
} from "./TabsNav.styles"

const DropdownNavItem = ({ label, routes }) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<NavItem onClick={onClick}>
			<div>{label}</div>
			{isOpen && (
				<>
					<SubmenuContainer>
						<Submenu>{routes}</Submenu>
					</SubmenuContainer>
					<Overlay onClick={onClick} />
				</>
			)}
		</NavItem>
	)
}

export const AccountPageTabs = withBreakpoints(
	({ currentBreakpoint, routes, userId, ...rest }) => {
		let routesWithIds = routes.map((route) => {
			return { ...route, path: route.path.replace(":id", userId) }
		})

		const isMobile = currentBreakpoint < 2

		if (isMobile) {
			routesWithIds = routesWithIds.reduce((acc, curr, i) => {
				if (!curr.category) {
					return { ...acc, [curr.id]: curr }
				} else {
					const categoryArr = acc[curr.category] ? [...acc[curr.category], curr] : [curr]
					return { ...acc, [curr.category]: categoryArr }
				}
			}, {})
		}

		return <TabsNav routes={routesWithIds} isMobile={isMobile} {...rest} />
	}
)

const TabsNav = ({ routes, isMobile, isAuthorized = false }) => {
	const routeEntries = Object.entries(routes)

	const renderDropdown = (categoryName, routes) => {
		let subRoutes = []
		routes.forEach((route) => {
			if ((isAuthorized || !route.isProtected) && !route.isHidden) {
				subRoutes.push(
					<StyledNavLink to={route.path} key={route.id}>
						{route.shortLabel}
					</StyledNavLink>
				)
			}
		})

		return subRoutes.length > 0 ? (
			<DropdownNavItem label={categoryName} routes={subRoutes} key={categoryName} />
		) : null
	}

	const renderSingleRoute = (route) => {
		return (
			(isAuthorized || !route.isProtected) &&
			(!isMobile || !route.isHiddenOnMobile) &&
			!route.isHidden && (
				<NavItem key={route.id}>
					<StyledNavLink to={route.path} key={route.id}>
						{route.label}
					</StyledNavLink>
				</NavItem>
			)
		)
	}

	return (
		<PageContainer extraWide>
			<OuterContainer>
				<Nav>
					{routeEntries.map(([key, value]) => {
						return Array.isArray(value)
							? renderDropdown(key, value)
							: renderSingleRoute(value)
					})}
				</Nav>
			</OuterContainer>
		</PageContainer>
	)
}

export default TabsNav
