import React from "react"
import { withRouter, NavLink } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components/macro"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import SignOut from "../SignOut"
import { withFirebase } from "../Firebase"
import Logo from "../Logo"
import BurgerNavigation from "../BurgerNavigation"
import MessagesManager from "../MessagesManager"
import { ACCOUNT_ROUTES } from "../Routes"

import { POST_CATEGORIES } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { swingInFwdTopAnimation } from "../../style-utils/animations"
import { route } from "../../utils"
import { useScrollPosition, useAuthentication } from "../../hooks"

const pageHeaderContainerCommon = css`
	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;
	height: 100%;
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
	height: var(--page-header-height);

	position: sticky;
	top: 0;
	z-index: 80;
	background: white;
	border-bottom: 1px solid white;
	transition: border-color 0.14s linear;
	border-color: var(--gray75);
	margin-bottom: var(--spacing4);
	/* ${(p) => p.scrollPosition !== 0 && "border-color: var(--gray75);"} */
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
	${swingInFwdTopAnimation}
	padding: var(--spacing2) 0;
	background: var(--black0);
	box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.3);
`

const IconContainer = styled.div`
	cursor: pointer;
	font-size: 1.6rem;
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
	font-weight: var(--semi-bold);

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
	transition: background-color 100ms linear, color 100ms linear;

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

const mobileNavItemCommon = css`
	${linkCommon}
	color: var(--gray25);
	font-weight: var(--semi-bold);

	&:hover {
		color: black;
		background: var(--almost-white);
	}
`

const MobileNavLink = styled(NavLink)`
	${linkCommon}
	${mobileNavItemCommon}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${SubmenuContainer} {
			display: block;
		}
	}

	&.active {
		color: black;
		font-weight: bold;
		background: var(--almost-white);
	}
`

const MobileNavItem = styled.div`
	${mobileNavItemCommon}
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

const MobileSignOutWrapper = ({ children }) => (
	<SignOut>{({ open }) => children(open)}</SignOut>
)

const PageHeaderMobile = ({ authUser, firebase, location }) => (
	<MobileSignOutWrapper>
		{(openSignOutModal) => (
			<PageHeaderContainerMobile>
				<Logo />
				<div className="align-right">
					{!authUser && (
						<MobileNavLink
							to={{ pathname: route("SIGN_IN"), state: { redirectTo: location } }}
						>
							Zaloguj
						</MobileNavLink>
					)}

					<MobileNavLink to={route("SEARCH")} exact>
						<IconContainer>
							<FontAwesomeIcon icon="search" />
						</IconContainer>
					</MobileNavLink>

					{authUser && (
						<NavItem>
							<MobileNavLink
								to={{ pathname: route("CHAT"), state: { redirectTo: location } }}
							>
								<MessagesManager />
							</MobileNavLink>
						</NavItem>
					)}

					{authUser && (
						<MobileNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
							<ProfilePicture
								size={"26px"}
								url={getProfilePictureURL(authUser, "S")}
								inline
							/>
						</MobileNavLink>
					)}

					<BurgerNavigation>
						<MobileNavLink to={route("HOME")} exact>
							Strona główna
						</MobileNavLink>
						<MobileNavLink to={route("BLOG_HOME")}>Czytaj</MobileNavLink>
						<MobileNavLink to={route("DROPS_SECTION", { id: "newest" })}>
							Dropy
						</MobileNavLink>
						<MobileNavLink to={route("MARKETPLACE")} exact>
							Kupuj
						</MobileNavLink>
						<MobileNavLink to={route("NEW_ITEM")}>Sprzedawaj</MobileNavLink>
						<MobileNavLink to={route("ABOUT")}>Informacje</MobileNavLink>

						{authUser && [
							<MobileNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
								Profil
							</MobileNavLink>,
							<MobileNavItem onClick={openSignOutModal}>Wyloguj</MobileNavItem>
						]}

						{!authUser && (
							<MobileNavLink
								to={{ pathname: route("SIGN_IN"), state: { redirectTo: location } }}
							>
								Zaloguj / Zarejestruj się
							</MobileNavLink>
						)}
					</BurgerNavigation>
				</div>
			</PageHeaderContainerMobile>
		)}
	</MobileSignOutWrapper>
)

const PageHeaderDesktop = ({ authUser, firebase, location }) => {
	return (
		<MobileSignOutWrapper>
			{(openSignOutModal) => (
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
							link={route("DROPS_SECTION", { id: "newest" })}
							label="Dropy"
							alignSubmenu="left"
						>
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

						<DesktopNavItem
							link={route("MARKETPLACE")}
							exact
							label="Kupuj"
							alignSubmenu="left"
						>
							<SubmenuItem link={route("MARKETPLACE")} label="Tablica" />
							<SubmenuItem link={route("DESIGNERS")} label="Projektanci / Marki" />
						</DesktopNavItem>

						<DesktopNavItem link={route("NEW_ITEM")} label="Sprzedawaj" />

						<DesktopNavItem link={route("ABOUT")} label="Informacje" alignSubmenu="left">
							<SubmenuItem link={route("ABOUT")} label="O nas" />
							<SubmenuItem link={route("CONTACT")} label="Kontakt" />
							<SubmenuItem link={route("FAQ")} label="FAQ" />
							<SubmenuItem link={route("ADVERTISE")} label="Współpraca" />
						</DesktopNavItem>
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

									<SubmenuItem label="Wyloguj" onClick={openSignOutModal} />
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
			)}
		</MobileSignOutWrapper>
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
