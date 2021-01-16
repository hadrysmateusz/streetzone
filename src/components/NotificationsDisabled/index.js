import React, { useState } from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

import { PageContainer } from "../Containers"

import { route } from "../../utils"
import { resetButtonStyles } from "../../style-utils"

const OuterContainer = styled.div`
  padding: var(--spacing2) 0;
  color: white;
  background: var(--danger0);
  font-size: var(--fs-xs);

  ${(p) =>
    !p.noMargin &&
    css`
      margin-top: calc(-1 * var(--page-header-margin));
      margin-bottom: var(--page-header-margin);
    `}
`

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    flex-direction: row;
  }
`

const turnOnNotificationsStyles = css`
  text-decoration: underline;
  font-weight: var(--semi-bold);
  white-space: nowrap;
  @media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
    margin-top: var(--spacing1);
  }
`

const StyledLink = styled(Link)`
  ${turnOnNotificationsStyles}
`

const StyledButton = styled.button`
  ${resetButtonStyles}
  ${turnOnNotificationsStyles}
  color: white;
`

const Message = styled.div`
  em {
    font-style: initial;
    font-weight: var(--semi-bold);
  }
`

const NotificationsDisabledBar = ({ noMargin = false }) => {
  const [permissionState, setPermissionState] = useState(() => Notification.permission)

  const areNotificationsSupported = "Notification" in window
  const areNotificationsEnabled = areNotificationsSupported && permissionState === "granted"

  function requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      setPermissionState(permission)
    })
  }

  const enableText = "Włącz powiadomienia"

  return !areNotificationsEnabled ? (
    <OuterContainer noMargin={noMargin}>
      <PageContainer>
        <InnerContainer>
          {areNotificationsSupported ? (
            <>
              <Message>
                <em>Powiadomienia są wyłączone</em> - Nie będziesz otrzymywał powiadomień o dropach
                i wiadomościach od innych użytkowników.{" "}
              </Message>

              {permissionState === "denied" ? (
                <StyledLink to={route("ALLOW_NOTIFICATIONS")}>{enableText}</StyledLink>
              ) : (
                <StyledButton onClick={requestNotificationPermission}>{enableText}</StyledButton>
              )}
            </>
          ) : (
            <Message>
              <em>Twoja przeglądarka nie wspiera powiadomień</em> - By otrzymywać powiadomienia,
              użyj innej przeglądarki np. Mozilla Firefox lub Google Chrome.
            </Message>
          )}
        </InnerContainer>
      </PageContainer>
    </OuterContainer>
  ) : null
}

export { NotificationsDisabledBar }
