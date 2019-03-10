import React from "react"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import styled from "styled-components"

import { withAuthentication } from "../UserSession"
import ProfilePicture from "../ProfilePicture"
import { ROUTES, CONST } from "../../constants"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { StyledNavLink } from "../Basics"
import { withFirebase } from "../Firebase"

const PageHeader = styled.header`
	padding: 0;

	width: 100%;
	max-width: ${(p) => p.theme.breakpoints[5]}px;
	margin: 0 auto;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	height: 70px;

	font-size: 1.6rem;
	font-family: "Playfair Display";

	padding: 0 20px;
`

const PageHeaderOuter = styled.div`
	position: sticky;
	top: 0;
	z-index: 80;

	background: white;
	border-bottom: 1px solid ${(p) => p.theme.colors.gray[75]};
`

const Nav = styled.nav`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: min-content;
	gap: 30px;
	${(p) => p.alignRight && "justify-content: flex-end;"}
	${(p) => p.centered && "justify-content: center;"}
`

const Submenu = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	background: white;

	border: 1px solid ${(p) => p.theme.colors.gray[75]};
	border-top: none;

	z-index: 81;

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: 5px 0;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);

	display: none;
`

const NavItem = styled.div`
	user-select: none;
	position: relative;
	list-style-type: none;
	white-space: nowrap;
	color: ${(p) => p.theme.colors.gray[0]};
	display: block;

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		:hover > ${Submenu} {
			display: block;
		}
	}

	> :first-child {
		height: 100%;
	}
`

const Logo = styled.div`
	font-size: var(--font-size--h2);
	font-weight: bold;
	font-family: "Playfair Display";

	flex: 1;
	user-select: none;
	position: relative;
	white-space: nowrap;
	color: ${(p) => p.theme.colors.black[75]};

	display: flex;
	align-items: center;
	justify-content: center;
`

const Navigation = ({ authUser, firebase, ...rest }) => {
	return (
		<PageHeaderOuter>
			<PageHeader {...rest}>
				<Nav>
					<NavItem>
						<StyledNavLink to={ROUTES.BLOG_HOME}>Czytaj</StyledNavLink>
					</NavItem>
					<NavItem>
						<StyledNavLink to={ROUTES.HOME} exact={true}>
							Kupuj
						</StyledNavLink>
					</NavItem>
					{authUser && (
						<NavItem>
							<StyledNavLink to={ROUTES.NEW_ITEM}>Sprzedawaj</StyledNavLink>
						</NavItem>
					)}
				</Nav>

				<Logo>{CONST.BRAND_NAME}</Logo>

				<Nav alignRight>
					{authUser ? (
						<>
							<NavItem>
								<StyledNavLink to={ROUTES.ACCOUNT_BASE.replace(":id", authUser.uid)}>
									<ProfilePicture
										size="44px"
										url={getProfilePictureURL(authUser, "S")}
										inline
									/>
								</StyledNavLink>
								<Submenu>
									<NavItem>
										<StyledNavLink to={ROUTES.ACCOUNT_ITEMS.replace(":id", authUser.uid)}>
											Twoje przedmioty
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink to={ROUTES.ACCOUNT_LIKED.replace(":id", authUser.uid)}>
											Zapisane przedmioty
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink
											to={ROUTES.ACCOUNT_FOLLOWING.replace(":id", authUser.uid)}
										>
											Obserwowani użytkownicy
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink
											to={ROUTES.ACCOUNT_FEEDBACK.replace(":id", authUser.uid)}
										>
											Opinie i komentarze
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink
											to={ROUTES.ACCOUNT_SETTINGS.replace(":id", authUser.uid)}
										>
											Opcje / Edytuj profil
										</StyledNavLink>
									</NavItem>

									<NavItem>
										<StyledNavLink as="a" onClick={firebase.signOut}>
											Wyloguj
										</StyledNavLink>
									</NavItem>
								</Submenu>
							</NavItem>
						</>
					) : (
						<NavItem>
							<StyledNavLink to={ROUTES.SIGN_IN}>Zaloguj się</StyledNavLink>
						</NavItem>
					)}
				</Nav>
			</PageHeader>
		</PageHeaderOuter>
	)
}

export default compose(
	withRouter,
	withAuthentication,
	withFirebase
)(Navigation)
