import { useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import { withRouter, Redirect } from "react-router-dom"
import { compose } from "recompose"

import { SignIn } from "../../pages/Auth/SignIn"
import { SignUp } from "../../pages/Auth/SignUp"

import { route } from "../../utils"

import Separator from "../Separator"
import { StatefulModal } from "../Modal/Modal"
import { ReactComponent as Logo } from "../Logo/logo-small-white.svg"

import { LinkButton, ModalAside, ModalContent, ModalOuterContainer } from "./AuthModal.styles"

const AuthModalContainer = ({ children }) => (
  <ModalOuterContainer>
    <ModalContent>{children}</ModalContent>
    <ModalAside>
      <Logo />
    </ModalAside>
  </ModalOuterContainer>
)

const SignInLink = ({ onChangePage }) => (
  <div style={{ marginTop: "calc(var(--spacing3) - 3px)" }}>
    Masz już konto? <LinkButton onClick={() => onChangePage("signIn")}>Zaloguj się</LinkButton>
  </div>
)

const SignUpLink = ({ onChangePage }) => (
  <div style={{ marginTop: "calc(var(--spacing3) - 2px)" }}>
    Nie masz jeszcze konta?{" "}
    <LinkButton onClick={() => onChangePage("signUp")}>Utwórz konto</LinkButton>
  </div>
)

const SignInModal = ({ changePage }) => (
  <div>
    <SignIn />
    <Separator />
    <SignUpLink onChangePage={changePage} />
  </div>
)

const SignUpModal = ({ changePage }) => (
  <div>
    <SignUp />
    <Separator />
    <SignInLink onChangePage={changePage} />
  </div>
)

const pages = {
  signIn: SignInModal,
  signUp: SignUpModal,
}

const AuthModal = ({ children, currentBreakpoint, location }) => {
  const [currentPage, setCurrentPage] = useState("signIn")

  const CurrentComponent = pages[currentPage]

  const changePage = (pageName) => setCurrentPage(pageName)

  const commonProps = { changePage }

  const isMobile = +currentBreakpoint < 1

  const redirectTo = { pathname: route("SIGN_IN"), state: { redirectTo: location } }

  return (
    <StatefulModal>
      {({ open, close, isOpen, modal }) =>
        isOpen && isMobile ? (
          <Redirect to={redirectTo} push />
        ) : (
          <>
            {children({ open, close, isOpen, modal })}
            {modal(
              <AuthModalContainer>
                <CurrentComponent {...commonProps} />
              </AuthModalContainer>
            )}
          </>
        )
      }
    </StatefulModal>
  )
}

export default compose(withBreakpoints, withRouter)(AuthModal)
