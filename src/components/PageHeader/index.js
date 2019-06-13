import React from "react"
import { withRouter, NavLink } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components/macro"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"
import BurgerNavigation from "../BurgerNavigation"
import MessagesManager from "../MessagesManager"

import { POST_CATEGORIES } from "../../constants"
import { ACCOUNT_ROUTES } from "../Routes"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { route } from "../../utils"
import { useScrollPosition, useAuthentication } from "../../hooks"

const pageHeaderContainerCommon = css`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	height: var(--page-header-height);
	margin: 0 auto;
	padding: 0 var(--spacing3);
	grid-template-rows: 100%;
`

export const PageHeaderContainerDesktop = styled.header`
	${pageHeaderContainerCommon}
	display: grid;
	grid-template-columns: auto 1fr auto;
`

export const PageHeaderContainerMobile = styled.header`
	${pageHeaderContainerCommon}
	display: grid;
	align-items: center;
	grid-template-columns: auto 1fr;

	.align-right {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		> * + * {
			margin-left: var(--spacing3);
		}
	}
`

export const PageHeaderOuter = styled.div`
	position: sticky;
	top: 0;
	z-index: 80;
	background: white;
	border-bottom: 1px solid white;
	transition: border-color 0.14s linear;
	${(p) => p.scrollPosition !== 0 && "border-color: var(--gray75);"}
`

const SubmenuContainer = styled.div`
	position: absolute;
	top: 100%;
	${(p) => `${p.align}: 0;`}
	z-index: 90;
	display: none;
`

const NavItem = styled.div`
	user-select: none;
	position: relative;
	white-space: nowrap;
	color: var(--gray0);
	display: block;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${SubmenuContainer} {
			display: block;
		}
	}

	> :first-child {
		height: 100%;
	}
`

const Nav = styled.nav`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: min-content;
	grid-template-rows: 100%;
	gap: var(--spacing2);
	${(p) => p.main && "padding-left: var(--spacing4);"}

	> * {
		height: 100%;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		gap: var(--spacing3);
	}
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		${(p) => p.main && "gap: var(--spacing4);"}
	}
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
`

const Submenu = styled.div`
	padding: var(--spacing2) 0;
	background: var(--black0);
	box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.3);
`

const IconContainer = styled.div`
	cursor: pointer;
	font-size: 1.8rem;
	color: black;
`

const linkCommon = css`
	user-select: none;
	position: relative;
	white-space: nowrap;

	display: flex;
	align-items: center;
	background: none;

	cursor: pointer;
	text-decoration: none;
	text-transform: uppercase;
	font-size: 11px;
`

const DesktopNavLink = styled(NavLink)`
	${linkCommon}
	padding: 0;
	color: var(--gray25);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${SubmenuContainer} {
			display: block;
		}
	}

	&:hover {
		color: black;
	}

	&.active {
		color: black;
		font-weight: bold;
	}
`

const submenuItemCommon = css`
	${linkCommon}
	padding: var(--spacing2) var(--spacing3);
	color: white;
	font-weight: var(--semi-bold);

	&:hover {
		color: white;
		background: var(--black50);
	}
`

const SubmenuLink = styled(NavLink)`
	${submenuItemCommon}

	&.active {
		color: white;
		background: var(--black50);
	}
`

const SubmenuButton = styled.div`
	${submenuItemCommon}
`

const SubmenuItem = ({ label, link, onClick }) => {
	const [authUser, isAuthenticated] = useAuthentication(true)

	return onClick ? (
		<SubmenuButton onClick={onClick}>{label}</SubmenuButton>
	) : (
		<SubmenuLink to={isAuthenticated ? link.replace(":id", authUser.uid) : link}>
			{label}
		</SubmenuLink>
	)
}

const DesktopNavItem = ({ children, label, alignSubmenu, exact, link }) => {
	return (
		<DesktopNavLink to={link} exact={exact}>
			{label}
			<SubmenuContainer align={alignSubmenu}>
				<Submenu>{children}</Submenu>
			</SubmenuContainer>
		</DesktopNavLink>
	)
}

const PageHeaderMobile = ({ authUser, firebase, location }) => {
	return (
		<PageHeaderContainerMobile>
			<Logo />
			<div className="align-right">
				{!authUser && (
					<StyledNavLink
						to={{ pathname: route("SIGN_IN"), state: { redirectTo: location } }}
					>
						Zaloguj
					</StyledNavLink>
				)}

				<StyledNavLink to={route("SEARCH")} exact>
					<IconContainer>
						<FontAwesomeIcon icon="search" />
					</IconContainer>
				</StyledNavLink>

				{authUser && (
					<NavItem>
						<StyledNavLink
							to={{ pathname: route("CHAT"), state: { redirectTo: location } }}
						>
							<MessagesManager />
						</StyledNavLink>
					</NavItem>
				)}

				{authUser && (
					<StyledNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
						<ProfilePicture
							size={"26px"}
							url={getProfilePictureURL(authUser, "S")}
							inline
						/>
					</StyledNavLink>
				)}

				<BurgerNavigation>
					<StyledNavLink to={route("HOME")} exact>
						Strona główna
					</StyledNavLink>
					<StyledNavLink to={route("BLOG_HOME")}>Czytaj</StyledNavLink>
					<StyledNavLink to={route("MARKETPLACE")} exact>
						Kupuj
					</StyledNavLink>
					<StyledNavLink to={route("DROPS")}>Dropy</StyledNavLink>
					<StyledNavLink to={route("NEW_ITEM")}>Sprzedawaj</StyledNavLink>

					{authUser && [
						<StyledNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
							Profil
						</StyledNavLink>,
						<StyledNavLink as="a" onClick={firebase.signOut}>
							Wyloguj się
						</StyledNavLink>
					]}

					{!authUser && (
						<StyledNavLink
							to={{ pathname: route("SIGN_IN"), state: { redirectTo: location } }}
						>
							Zaloguj / Zarejestruj się
						</StyledNavLink>
					)}
				</BurgerNavigation>
			</div>
		</PageHeaderContainerMobile>
	)
}

const PageHeaderDesktop = ({ authUser, firebase, location }) => {
	return (
		<PageHeaderContainerDesktop>
			<Logo />
			<Nav main>
				<DesktopNavItem link={route("BLOG_HOME")} label="Czytaj" alignSubmenu="left">
					{Object.values(POST_CATEGORIES).map((category) => (
						<SubmenuItem
							key={category}
							link={route("BLOG_CATEGORY", { category })}
							exact
							label={category}
						/>
					))}
				</DesktopNavItem>

				<DesktopNavItem
					link={route("MARKETPLACE")}
					exact
					label="Kupuj"
					alignSubmenu="left"
				>
					<SubmenuItem link={route("MARKETPLACE")} label="Tablica" />
					<SubmenuItem link={route("DESIGNERS")} label="Projektanci / Marki" />
				</DesktopNavItem>

				<DesktopNavItem link={route("DROPS")} label="Dropy" alignSubmenu="left">
					<SubmenuItem link={route("DROPS_SECTION", { id: "newest" })} label="Nowe" />
					<SubmenuItem
						link={route("DROPS_SECTION", { id: "upcoming" })}
						label="Nadchodzące"
					/>
					<SubmenuItem
						link={route("DROPS_SECTION", { id: "archive" })}
						label="Archiwum"
					/>
				</DesktopNavItem>

				<DesktopNavItem link={route("NEW_ITEM")} label="Sprzedawaj" />
			</Nav>

			<Nav alignRight>
				<DesktopNavItem
					link={route("SEARCH")}
					label={
						<IconContainer>
							<FontAwesomeIcon icon="search" />
						</IconContainer>
					}
				/>
				{authUser ? (
					<>
						<DesktopNavItem link={route("CHAT")} label={<MessagesManager />} />
						<DesktopNavItem
							alignSubmenu="right"
							link={route("ACCOUNT_ITEMS", { id: authUser.uid })}
							label={
								<ProfilePicture
									size={"30px"}
									url={getProfilePictureURL(authUser, "S")}
									inline
								/>
							}
						>
							{ACCOUNT_ROUTES.map((route) =>
								route.isHidden ? null : (
									<SubmenuItem label={route.label} link={route.path} />
								)
							)}

							<SubmenuItem label="Wyloguj" onClick={firebase.signOut} />
						</DesktopNavItem>
					</>
				) : (
					<DesktopNavItem
						link={{ pathname: route("SIGN_IN"), state: { redirectTo: location } }}
						label="Zaloguj"
					/>
				)}
			</Nav>
		</PageHeaderContainerDesktop>
	)
}

const PageHeader = ({ authUser, firebase, currentBreakpoint, location }) => {
	const scrollPosition = useScrollPosition()
	const isMobile = currentBreakpoint <= 1

	const commonProps = {
		authUser,
		firebase,
		location
	}

	return (
		<PageHeaderOuter scrollPosition={scrollPosition}>
			{isMobile ? (
				<PageHeaderMobile {...commonProps} />
			) : (
				<PageHeaderDesktop {...commonProps} />
			)}
		</PageHeaderOuter>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase,
	withBreakpoints
)(PageHeader)
