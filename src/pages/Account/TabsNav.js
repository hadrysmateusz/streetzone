import React, { useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import Overlay from "../../components/Overlay"

import {
	Submenu,
	SubmenuContainer,
	Nav,
	NavItem,
	StyledNavLink,
	OuterContainer
} from "./TabsNav.styles"
import { PageContainer } from "../../components/Containers"

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

		if (currentBreakpoint < 2) {
			routesWithIds = routesWithIds.reduce((acc, curr, i) => {
				if (!curr.category) {
					return { ...acc, [curr.id]: curr }
				} else {
					const categoryArr = acc[curr.category] ? [...acc[curr.category], curr] : [curr]
					return { ...acc, [curr.category]: categoryArr }
				}
			}, {})
		}

		return <TabsNav routes={routesWithIds} {...rest} />
	}
)

const TabsNav = ({ routes, isAuthorized = false }) => {
	return (
		<PageContainer extraWide>
			<OuterContainer>
				<Nav>
					{Object.entries(routes).map(([key, value], i) => {
						if (Array.isArray(value)) {
							let subRoutes = []
							value.forEach((route) => {
								if ((isAuthorized || !route.isProtected) && !route.isHidden) {
									subRoutes.push(
										<StyledNavLink to={route.path} key={route.id}>
											{route.shortLabel}
										</StyledNavLink>
									)
								}
							})

							return subRoutes.length > 0 ? (
								<DropdownNavItem label={key} routes={subRoutes} />
							) : null
						} else {
							return (
								(isAuthorized || !value.isProtected) &&
								!value.isHidden && (
									<NavItem>
										<StyledNavLink to={value.path} key={value.id}>
											{value.label}
										</StyledNavLink>
									</NavItem>
								)
							)
						}
					})}
				</Nav>
			</OuterContainer>
		</PageContainer>
	)
}

export default TabsNav
