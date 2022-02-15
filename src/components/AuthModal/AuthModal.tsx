import React, { useState } from "react"
import { withBreakpoints } from "react-breakpoints"
import { Redirect, useLocation } from "react-router-dom"

import { SignIn } from "../../pages/Auth/SignIn"
import { SignUp } from "../../pages/Auth/SignUp"

import { route } from "../../utils"

import Separator from "../Separator"
import { ModalRenderProps, StatefulModal } from "../Modal"
import { ReactComponent as Logo } from "../Logo/logo-small-white.svg"

import {
  LinkButton,
  ModalAside,
  ModalContent,
  ModalOuterContainer,
} from "./AuthModal.styles"

type Page = "signIn" | "signUp"

const AuthModalContainer: React.FC = ({ children }) => (
  <ModalOuterContainer>
    <ModalContent>{children}</ModalContent>
    <ModalAside>
      <Logo />
    </ModalAside>
  </ModalOuterContainer>
)

const SignInLink: React.FC<{ onChangePage: (page: Page) => void }> = ({
  onChangePage,
}) => (
  <div style={{ marginTop: "calc(var(--spacing3) - 3px)" }}>
    Masz już konto?{" "}
    <LinkButton onClick={() => onChangePage("signIn")}>Zaloguj się</LinkButton>
  </div>
)

const SignUpLink: React.FC<{ onChangePage: (page: Page) => void }> = ({
  onChangePage,
}) => (
  <div style={{ marginTop: "calc(var(--spacing3) - 2px)" }}>
    Nie masz jeszcze konta?{" "}
    <LinkButton onClick={() => onChangePage("signUp")}>Utwórz konto</LinkButton>
  </div>
)

const SignInModal: React.FC<{ changePage: (page: Page) => void }> = ({
  changePage,
}) => (
  <div>
    <SignIn />
    <Separator />
    <SignUpLink onChangePage={changePage} />
  </div>
)

const SignUpModal: React.FC<{ changePage: (page: Page) => void }> = ({
  changePage,
}) => (
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

type AuthModalProps = {
  children: (renderProps: ModalRenderProps) => React.ReactElement
}

const AuthModal: React.FC<
  AuthModalProps & {
    currentBreakpoint: number
  }
> = ({ children, currentBreakpoint }) => {
  const location = useLocation()

  const [currentPage, setCurrentPage] = useState<Page>("signIn")

  const CurrentComponent = pages[currentPage]

  const changePage = (pageName: Page) => setCurrentPage(pageName)

  const commonProps = { changePage }

  const isMobile = +currentBreakpoint < 1

  const redirectTo = {
    pathname: route("SIGN_IN"),
    state: { redirectTo: location },
  }

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

export default withBreakpoints<AuthModalProps>(AuthModal)
