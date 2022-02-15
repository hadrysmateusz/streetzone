import { withBreakpoints } from "react-breakpoints"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { POST_CATEGORIES } from "../../constants"
import { getProfilePictureURL, route } from "../../utils"
import { useAuthentication } from "../../hooks"

import BurgerNavigation from "../BurgerNavigation"
import MessagesManager from "../MessagesManager"
import ProfilePicture from "../ProfilePicture"
import { ACCOUNT_ROUTES } from "../Routes"
import { SignOut } from "../SignOut"
import { Logo } from "../Logo"

import {
  DesktopNavLink,
  IconContainer,
  MobileNavItem,
  MobileNavLink,
  Nav,
  NavItem,
  PageHeaderContainerDesktop,
  PageHeaderContainerMobile,
  PageHeaderOuter,
  Submenu,
  SubmenuButton,
  SubmenuContainer,
  SubmenuLink,
} from "./PageHeader.styles"
import { NavLinkProps, useLocation } from "react-router-dom"

const SubmenuItem: React.FC<
  {
    label: string
    exact?: boolean
  } & (
    | { link: string; onClick?: undefined }
    | { link?: undefined; onClick: React.MouseEventHandler }
  )
> = ({ label, link, onClick, exact = false }) => {
  const authUser = useAuthentication()
  const isAuthenticated = !!authUser

  if (link) {
    return (
      <SubmenuLink
        to={isAuthenticated ? link.replace(":id", authUser.uid) : link}
        exact={exact}
      >
        {label}
      </SubmenuLink>
    )
  }

  if (onClick) {
    return <SubmenuButton onClick={onClick}>{label}</SubmenuButton>
  }

  throw new Error("Either link or click handler is required in SubmenuItem")
}
type DesktopNavItemProps = {
  label: React.ReactNode
  link: NavLinkProps["to"]
  exact?: boolean
  alignSubmenu?: "left" | "right"
}

const DesktopNavItem: React.FC<DesktopNavItemProps> = ({
  children,
  label,
  alignSubmenu,
  exact = false,
  link,
}) => {
  if (!alignSubmenu && children) {
    throw new Error(
      "alignSubmenu prop is required when passing children to DesktopNavItem"
    )
  }

  return (
    <DesktopNavLink to={link} exact={exact}>
      {label}
      {children && alignSubmenu ? (
        <SubmenuContainer align={alignSubmenu}>
          <Submenu>{children}</Submenu>
        </SubmenuContainer>
      ) : null}
    </DesktopNavLink>
  )
}

const MobileSignOutWrapper: React.FC<{
  children: (open: () => void) => React.ReactElement
}> = ({ children }) => {
  return <SignOut>{({ open }) => children(open)}</SignOut>
}

const PageHeaderMobile: React.FC<{}> = () => {
  const location = useLocation()
  const authUser = useAuthentication()

  return (
    <MobileSignOutWrapper>
      {(openSignOutModal) => (
        <PageHeaderContainerMobile>
          <Logo />
          <div className="align-right">
            {!authUser ? (
              <MobileNavLink
                to={{
                  pathname: route("SIGN_IN"),
                  state: { redirectTo: location },
                }}
              >
                Zaloguj
              </MobileNavLink>
            ) : null}

            <MobileNavLink to={route("SEARCH")} exact>
              <IconContainer>
                <FontAwesomeIcon icon="search" />
              </IconContainer>
            </MobileNavLink>

            {authUser ? (
              <NavItem>
                <MobileNavLink
                  to={{
                    pathname: route("CHAT"),
                    state: { redirectTo: location },
                  }}
                >
                  <MessagesManager />
                </MobileNavLink>
              </NavItem>
            ) : null}

            {authUser ? (
              <MobileNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
                <ProfilePicture
                  size={"26px"}
                  url={getProfilePictureURL(authUser, "S")}
                  inline
                />
              </MobileNavLink>
            ) : null}

            <BurgerNavigation>
              <MobileNavLink to={route("BLOG_HOME")}>Blog</MobileNavLink>
              <MobileNavLink to={route("DROPS_SECTION", { id: "newest" })}>
                Dropy
              </MobileNavLink>
              <MobileNavLink to={route("MARKETPLACE")} exact>
                Tablica
              </MobileNavLink>
              <MobileNavLink to={route("NEW_ITEM")}>Sprzedawaj</MobileNavLink>
              <MobileNavLink to={route("FAQ")}>FAQ</MobileNavLink>
              <MobileNavLink to={route("CONTACT")}>Kontakt</MobileNavLink>

              {authUser && [
                <MobileNavLink to={route("ACCOUNT_BASE", { id: authUser.uid })}>
                  Profil
                </MobileNavLink>,
                <MobileNavItem onClick={openSignOutModal}>
                  Wyloguj
                </MobileNavItem>,
              ]}

              {!authUser && (
                <MobileNavLink
                  to={{
                    pathname: route("SIGN_IN"),
                    state: { redirectTo: location },
                  }}
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
}

const PageHeaderDesktop: React.FC<{}> = () => {
  const location = useLocation()
  const authUser = useAuthentication()

  return (
    <MobileSignOutWrapper>
      {(openSignOutModal) => (
        <PageHeaderContainerDesktop>
          <Logo />
          <Nav main>
            <DesktopNavItem
              link={route("MARKETPLACE")}
              exact
              label="Tablica"
              alignSubmenu="left"
            >
              <SubmenuItem link={route("MARKETPLACE")} label="Tablica" />
              <SubmenuItem
                link={route("DESIGNERS")}
                label="Projektanci / Marki"
              />
            </DesktopNavItem>

            <DesktopNavItem
              link={route("BLOG_HOME")}
              label="Blog"
              alignSubmenu="left"
            >
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
              <SubmenuItem
                link={route("DROPS_SECTION", { id: "newest" })}
                label="Nowe"
              />
              <SubmenuItem
                link={route("DROPS_SECTION", { id: "upcoming" })}
                label="Nadchodzące"
              />
              <SubmenuItem
                link={route("DROPS_SECTION", { id: "archive" })}
                label="Archiwum"
              />
            </DesktopNavItem>

            <DesktopNavItem link={route("DEALS")} label="Okazje" />

            <DesktopNavItem link={route("NEW_ITEM")} label="Sprzedawaj" />

            <DesktopNavItem
              link={route("FAQ")}
              label={<FontAwesomeIcon icon="ellipsis-h" />}
              alignSubmenu="left"
            >
              <SubmenuItem link={route("FAQ")} label="FAQ" />
              <SubmenuItem link={route("CONTACT")} label="Kontakt" />
              {/* <SubmenuItem link={route("ADVERTISE")} label="Współpraca" /> */}
              {/* <SubmenuItem link={route("PROMOTING_INFO")} label="O promowaniu" /> */}
              {/* <SubmenuItem link={route("ALLOW_NOTIFICATIONS")} label="Włącz powiadomienia" /> */}
              {/* <SubmenuItem link={route("PARTNERS")} label="Partnerzy" /> */}
              {/* <SubmenuItem link={route("ABOUT")} label="O nas" /> */}
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
                <DesktopNavItem
                  link={route("CHAT")}
                  label={<MessagesManager />}
                />
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
                      <SubmenuItem
                        key={route.path + route.label}
                        label={route.label}
                        link={route.path}
                      />
                    )
                  )}

                  <SubmenuItem
                    label="Wyloguj"
                    onClick={(e) => {
                      e.preventDefault() // prevent redirect to account page
                      openSignOutModal()
                    }}
                  />
                </DesktopNavItem>
              </>
            ) : (
              <DesktopNavItem
                link={{
                  pathname: route("SIGN_IN"),
                  state: { redirectTo: location },
                }}
                label="Zaloguj"
              />
            )}
          </Nav>
        </PageHeaderContainerDesktop>
      )}
    </MobileSignOutWrapper>
  )
}

const PageHeader: React.FC<{ currentBreakpoint: number }> = ({
  currentBreakpoint,
}) => {
  const isMobile = currentBreakpoint <= 1

  return (
    <PageHeaderOuter>
      {isMobile ? <PageHeaderMobile /> : <PageHeaderDesktop />}
    </PageHeaderOuter>
  )
}

export default withBreakpoints<{}>(PageHeader)
