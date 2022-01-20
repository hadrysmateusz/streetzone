import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import HelmetBasics from "../../components/HelmetBasics"
import Button, { ButtonContainer } from "../../components/Button"

const AllowNotifications = () => {
  const history = useHistory()

  // TODO: make sure this value is always updated
  const [isPermissionGranted, setIsPermissionGranted] = useState(
    Notification.permission === "granted"
  )

  const requestPermission = () => {
    Notification.requestPermission().then((permission) =>
      setIsPermissionGranted(permission === "granted")
    )
  }

  return (
    <>
      <HelmetBasics title="Włącz powiadomienia" />
      <p>Placeholder: Instrukcje włączenia powiadomień</p>
      <ButtonContainer>
        <Button primary disabled={isPermissionGranted} onClick={requestPermission}>
          {isPermissionGranted ? "Powiadomienia są włączone" : "Pozwól na wysyłanie powiadomień"}
        </Button>
        <Button
          onClick={() => {
            history.goBack()
          }}
        >
          Wróć
        </Button>
      </ButtonContainer>
    </>
  )
}

export default AllowNotifications
