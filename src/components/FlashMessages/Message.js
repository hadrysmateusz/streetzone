import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  ContentContainer,
  Details,
  Heading,
  IconContainer,
  MessageContainer,
} from "./Message.styles"

export const Message = ({ ttl = 5000, id, text, details, type, onDelete }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onDelete(id)
    }, ttl)

    return () => clearTimeout(timeoutId)
  }, [id, onDelete, ttl])

  let icon, color
  switch (type) {
    case "success":
      icon = "check-circle"
      color = "var(--success50)"
      break
    case "error":
      icon = "exclamation-circle"
      color = "var(--danger50)"
      break
    case "info":
      icon = "info-circle"
      color = "#145de3"
      break
    default:
      throw Error(`invalid flash message type (${type})`)
  }

  return (
    <MessageContainer ttl={ttl} color={color}>
      <IconContainer color={color}>
        <FontAwesomeIcon icon={icon} />
      </IconContainer>
      <ContentContainer>
        <Heading>{text}</Heading>
        {details && <Details>{details}</Details>}
      </ContentContainer>
    </MessageContainer>
  )
}
