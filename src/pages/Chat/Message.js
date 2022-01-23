import { useEffect } from "react"
import moment from "moment"

import { useFirebase } from "../../hooks"

import { MessageStyles } from "./StyledComponents"

export const Message = ({ id, roomId, message, createdAt, author, user, unread }) => {
  const firebase = useFirebase()
  const formattedCreatedAt = moment().to(createdAt)
  const isAuthor = author === user.uid

  useEffect(() => {
    // mark message as read
    if (unread && !isAuthor) {
      firebase.db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .doc(id)
        .update({ unread: false })
    }
  }, [firebase.db, id, isAuthor, roomId, unread])

  return (
    <MessageStyles isAuthor={isAuthor}>
      <div className="createdAt">{formattedCreatedAt}</div>
      <pre className="message">{message}</pre>
    </MessageStyles>
  )
}
