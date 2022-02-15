// has to be type button to prevent accidental submits
import React from "react"
import { useHistory } from "react-router-dom"
import { Button } from "./Button"

export const BackButton: React.FC = ({
  children = "Wróć",
}: {
  children?: React.ReactNode
}) => {
  const history = useHistory()
  return (
    <Button type="button" onClick={() => history.goBack()}>
      {children}
    </Button>
  )
}
