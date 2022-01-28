import { useState } from "react"
import { withRouter } from "react-router-dom"
import { nanoid } from "nanoid"

import { PageContainer } from "../../../components/Containers"
import { getMainImageIndex } from "../../../components/FileHandler"

import { useFlash, useFirebase } from "../../../hooks"
import { resetFormAndRedirect } from "../../../utils"

import PostForm from "./Form"

const AddPost = ({ history }) => {
  const firebase = useFirebase()
  const [postId] = useState(() => nanoid())
  const flashMessage = useFlash()

  const onSubmit = async (values, form) => {
    try {
      const files = values.files

      // Get attachments' refs
      const attachments = files.map((file) => file.ref)

      // Get main image index
      const mainImageIndex = getMainImageIndex(files)

      // Add post to database
      await firebase.createPost({
        ...values,
        mainImageIndex,
        attachments,
        id: postId,
      })

      // Reset form and redirect
      // TODO: add success flash message
      resetFormAndRedirect(form, history)("ADMIN_DROPS")
    } catch (error) {
      console.error(error)
      flashMessage(ERROR_MESSAGE)
    }
  }

  return (
    <PageContainer>
      PostId: {postId}
      <PostForm onSubmit={onSubmit} postId={postId} />
    </PageContainer>
  )
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Wystąpił błąd",
  details: "Więcej informacji w konsoli",
}

export default withRouter(AddPost)
