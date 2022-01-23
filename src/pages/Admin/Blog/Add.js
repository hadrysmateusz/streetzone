import { useState } from "react"
import { withRouter } from "react-router-dom"
import { nanoid } from "nanoid"

import { PageContainer } from "../../../components/Containers"

import { useFlash, useFirebase } from "../../../hooks"
import { formatPostDataForDb, MODE } from "../../../utils/formatting/formatPostData"
import { route } from "../../../utils"

import PostForm from "./Form"

const AddPost = ({ history }) => {
  const firebase = useFirebase()
  const [postId] = useState(nanoid())
  const flashMessage = useFlash()

  const onSubmit = async (values, form) => {
    try {
      const files = values.files

      // Get attachments' refs
      const attachments = files.map((file) => file.ref)

      // Get main image index
      const mainImageIndex = files.findIndex((a) => a.isMain)

      // Format the values for db
      const formattedData = formatPostDataForDb(
        { ...values, mainImageIndex, attachments },
        MODE.CREATE
      )

      // Add post to database
      await firebase.post(formattedData.id).set(formattedData)

      // Reset form
      setTimeout(form.reset)

      // Redirect
      history.push(route("ADMIN_BLOG"))
    } catch (error) {
      console.error(error)
      flashMessage({
        type: "error",
        text: "Wystąpił błąd",
        details: "Więcej informacji w konsoli",
      })
    }
  }

  return (
    <PageContainer>
      PostId: {postId}
      <PostForm onSubmit={onSubmit} postId={postId} />
    </PageContainer>
  )
}

export default withRouter(AddPost)
