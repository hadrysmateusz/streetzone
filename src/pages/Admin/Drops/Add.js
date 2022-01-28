import { useHistory } from "react-router-dom"

import { PageContainer } from "../../../components/Containers"

import { getMainImageIndex } from "../../../components/FileHandler"
import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { useFlash, useFirebase } from "../../../hooks"
import { dropModel } from "../../../schema"

import DropForm from "./DropsForm"

const AddDrop = () => {
  const history = useHistory()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSubmit = async (values, form) => {
    try {
      const files = values.files

      // Upload files to storage and get their refs
      const attachments = await firebase.batchGetAttachmentRefFromCustomFile(
        CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
        files
      )

      // Get main image index
      const mainImageIndex = getMainImageIndex(files)

      // Format the values for db
      const formattedData = dropModel.formatForCreate({
        ...values,
        mainImageIndex,
        attachments,
      })

      console.log(formattedData)

      // Add drop to database
      await firebase.drop(formattedData.id).set(formattedData)

      setTimeout(() => {
        form.reset()
        history.push(route("ADMIN_DROPS"))
      })
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
      <DropForm onSubmit={onSubmit} />
    </PageContainer>
  )
}

export default AddDrop
