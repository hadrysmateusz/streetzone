import { useState } from "react"

import { route } from "../../utils"

import { PageContainer } from "../Containers"

import {
  InnerContainer,
  Message,
  OuterContainer,
  StyledButton,
  StyledLink,
} from "./NotificationsDisabled.styles"

export const NotificationsDisabledBar: React.FC<{ noMargin?: boolean }> = ({
  noMargin = false,
}) => {
  const [permissionState, setPermissionState] = useState(
    () => Notification.permission
  )

  // TODO: reuse areNotificationsSupported() helper
  const areNotificationsSupported = "Notification" in window
  const areNotificationsEnabled =
    areNotificationsSupported && permissionState === "granted"

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
                <em>Powiadomienia są wyłączone</em> - Nie będziesz otrzymywał
                powiadomień o dropach i wiadomościach od innych użytkowników.{" "}
              </Message>

              {permissionState === "denied" ? (
                <StyledLink to={route("ALLOW_NOTIFICATIONS")}>
                  {enableText}
                </StyledLink>
              ) : (
                <StyledButton onClick={requestNotificationPermission}>
                  {enableText}
                </StyledButton>
              )}
            </>
          ) : (
            <Message>
              <em>Twoja przeglądarka nie wspiera powiadomień</em> - By
              otrzymywać powiadomienia, użyj innej przeglądarki np. Mozilla
              Firefox lub Google Chrome.
            </Message>
          )}
        </InnerContainer>
      </PageContainer>
    </OuterContainer>
  ) : null
}
