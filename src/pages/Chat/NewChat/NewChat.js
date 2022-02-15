import { useHistory } from "react-router-dom"
import { nanoid } from "nanoid"
import { Field, Form } from "react-final-form"

import { ButtonContainer } from "../../../components/Button"
import { Textarea } from "../../../components/FormElements"

import { useAuthentication, useFirebase } from "../../../hooks"
import { route } from "../../../utils"

import { validate } from "./validate"
import {
  FormSubmitButton,
  getFormError,
} from "../../../components/FinalFormFields"

export const NewChat = ({ userId, flexibleTextarea = false }) => {
  const authUser = useAuthentication()
  const firebase = useFirebase()
  const history = useHistory()

  const onSubmit = async (values, form) => {
    const message = values.message

    setTimeout(form.reset)

    let roomId
    const messageId = nanoid()
    const senderId = authUser.uid
    const recipientId = userId

    // get common room for both users
    let roomSnap = await firebase
      .currentUser()
      .collection("rooms")
      .doc(userId)
      .get()

    // Create room if it doesn't exist yet
    if (!roomSnap.exists) {
      roomId = nanoid()

      // create room in the rooms collection
      await firebase.db
        .collection("rooms")
        .doc(roomId)
        .set({ id: roomId, userA: senderId, userB: recipientId })

      // Add room of recipient to sender
      await firebase
        .user(senderId)
        .collection("rooms")
        .doc(recipientId)
        .set({ id: roomId, otherUserId: recipientId })

      // Add room of sender to recipient
      await firebase
        .user(recipientId)
        .collection("rooms")
        .doc(senderId)
        .set({ id: roomId, otherUserId: senderId })
    } else {
      roomId = roomSnap.data().id
    }

    // add message to room
    await firebase.db
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .doc(messageId)
      .set({
        id: messageId,
        createdAt: Date.now(),
        message,
        author: senderId,
        unread: true,
      })

    // navigate to correct room in chat view
    history.push(route("CHAT_ROOM", { roomId }))
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {/* Comment */}
          <Field name="message">
            {({ input, meta }) => (
              <Textarea
                {...input}
                autoResize={flexibleTextarea}
                numberOfLines={flexibleTextarea ? undefined : 3}
                placeholder="Wiadomość"
                error={getFormError(meta)}
              />
            )}
          </Field>

          <ButtonContainer>
            <FormSubmitButton text="Wyślij" big />
          </ButtonContainer>
        </form>
      )}
    />
  )
}
