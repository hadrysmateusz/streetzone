import { withRouter } from "react-router-dom"
import { PageContainer } from "../../../components/Containers"

import { formatDropDataForDb, MODE } from "../../../utils/formatting/formatDropData"
import { CONST } from "../../../constants"
import { route } from "../../../utils"
import { useFlash, useFirebase } from "../../../hooks"

import DropForm from "./DropsForm"

const AddDrop = ({ history }) => {
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSubmit = async (values, form) => {
    try {
      const files = values.files

      // Upload files to storage and get their refs
      const attachments = await firebase.batchUploadFiles(
        CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
        files
      )

      // Get main image index
      const mainImageIndex = files.findIndex((a) => a.isMain)

      // Format the values for db
      const formattedData = formatDropDataForDb(
        { ...values, mainImageIndex, attachments },
        MODE.CREATE
      )

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

export default withRouter(AddDrop)
