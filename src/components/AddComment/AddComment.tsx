import React, { useCallback, useEffect, useState } from "react"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"

import { Heading, OuterContainer } from "./AddComment.styles"
import { AddCommentFormValues } from "./types"
import { FinalFormOnSubmit } from "../../types"
import { AddCommentForm } from "./AddCommentForm"
import { Opinion } from "../../schema"

const AddComment: React.FC<{ userId: string }> = ({ userId }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()

  const [formState, setFormState] = useState<{
    isReady: boolean
    initialValues: AddCommentFormValues | undefined
  }>({
    isReady: false,
    initialValues: undefined,
  })

  const getYourCommentRef = useCallback(() => {
    if (!authUser) {
      throw new Error("You need to be logged in to add comments")
    }
    const authorId = authUser.uid
    return firebase.user(userId).collection("opinions").doc(authorId)
  }, [authUser, firebase, userId])

  // TODO: use subscription to update the form when database changes are detected
  useEffect(() => {
    ;(async () => {
      setFormState({ initialValues: undefined, isReady: false })
      const commentRef = await getYourCommentRef()
      const commentSnap = await commentRef.get()
      const commentExisted = commentSnap.exists
      console.log(commentSnap)
      if (!commentExisted) {
        setFormState({ initialValues: undefined, isReady: true })
      } else {
        const commentData = commentSnap.data() as Opinion // TODO: proper model and API to ensure opinions types
        setFormState({
          initialValues: {
            comment: commentData.comment,
            rating: commentData.rating,
          },
          isReady: true,
        })
      }
    })()
  }, [getYourCommentRef])

  const onSubmit = useCallback<FinalFormOnSubmit<AddCommentFormValues>>(
    async (values, form) => {
      try {
        if (!authUser) {
          throw new Error("No authUser")
        }

        const authorId = authUser.uid

        // TODO: opinions model
        const payload = {
          author: authorId,
          comment: values.comment,
          rating: values.rating,
          createdAt: Date.now(),
        }

        const commentRef = await getYourCommentRef()
        const commentDoc = await commentRef.get()
        const commentExisted = commentDoc.exists

        // Add opinion to opinions sub-collection under the id of its author to enforce one comment per author
        await commentRef.set(payload)

        flashMessage({
          type: "success",
          text: commentExisted ? "Opinia została edytowana" : "Dodano",
        })

        // Reset the form
        setTimeout(() => {
          setFormState({
            initialValues: {
              comment: payload.comment,
              rating: payload.rating,
            },
            isReady: true,
          })
          form.reset()
        })
      } catch (error) {
        console.error(error)
        flashMessage(ERROR_MESSAGE)
      }
    },
    [authUser, flashMessage, getYourCommentRef]
  )

  return (
    <OuterContainer>
      <Heading>
        {formState.initialValues
          ? "Edytuj swoją opinie"
          : "Wystaw opinie o sprzedawcy"}
      </Heading>
      {formState.isReady ? (
        <AddCommentForm
          onSubmit={onSubmit}
          initialValues={formState.initialValues}
        />
      ) : null}
    </OuterContainer>
  )
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Wystąpił błąd",
  details: "Komentarz mógł nie zostać dodany",
} as const

export default AddComment
