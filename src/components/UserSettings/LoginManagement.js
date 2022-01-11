import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components/macro"

import { PageContainer } from "../Containers"
import LoadingSpinner from "../LoadingSpinner"
import Separator from "../Separator"
import ErrorBox from "../ErrorBox"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import PasswordManagement from "./PasswordManagement"
import SocialLoginManagement from "./SocialLoginManagement"

const Section = styled.div`
  margin: var(--spacing5) 0;
`

const LoginManagement = () => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()
  const [activeMethods, setActiveMethods] = useState(null)
  const [error, setError] = useState(null)

  const fetchActiveMethods = useCallback(async () => {
    try {
      const activeMethods = await firebase.auth.fetchSignInMethodsForEmail(authUser.email)
      setActiveMethods(activeMethods)
    } catch (error) {
      setError(error)
    }
  }, [authUser.email, firebase.auth])

  useEffect(() => {
    fetchActiveMethods()
  }, [fetchActiveMethods])

  const onSuccess = (message) => {
    flashMessage(message)
    fetchActiveMethods()
  }

  return error ? (
    <ErrorBox error={error} />
  ) : !activeMethods ? (
    <LoadingSpinner />
  ) : (
    <>
      <Section>
        <PageContainer maxWidth={1}>
          <PasswordManagement activeMethods={activeMethods} onSuccess={onSuccess} />
        </PageContainer>
      </Section>

      <Separator />

      <Section>
        <PageContainer maxWidth={1}>
          <SocialLoginManagement activeMethods={activeMethods} onSuccess={onSuccess} />
        </PageContainer>
      </Section>
    </>
  )
}

export default LoginManagement
