import { useState, useEffect, useCallback } from "react"
import { useRouteMatch, useHistory } from "react-router-dom"

import { CustomFile, getMainImageIndex } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"

import { useFlash, useFirebase } from "../../../hooks"
import { resetFormAndRedirect } from "../../../utils"
import { CONST } from "../../../constants"

import DropForm from "./DropsForm"

const EditDrop = () => {
  const match = useRouteMatch()
  const history = useHistory()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const [initialValues, setInitialValues] = useState(null)

  const id = match.params.id

  const getInitialValues = useCallback(async () => {
    let data = await firebase.getDropById(id)

    // Get attachment urls for previews
    const imageURLs = await firebase.batchGetImageURLs(data.attachments)

    // create CustomFile objects with the fetched previewUrls
    const files = data.attachments.map(
      (attachment, i) =>
        new CustomFile({
          storageRef: attachment,
          previewUrl: imageURLs[i],
          isUploaded: true,
        })
    )

    return { ...data, files }
  }, [firebase, id])

  useEffect(() => {
    getInitialValues().then((values) => setInitialValues(values))
  }, [getInitialValues])

  const onSubmit = async (values, form) => {
    try {
      // We fetch here again because data in initialValues state is meant for the form, and this ensures the data is fresh
      const prevData = await firebase.getDropById(id)

      const files = values.files

      const newAttachmentRefs =
        await firebase.batchGetAttachmentRefFromCustomFile(
          CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
          files
        )
      const imageUrls = await firebase.batchGetImageURLs(newAttachmentRefs)
      const mainImageIndex = getMainImageIndex(files)

      // Update the drop in firestore
      await firebase.updateDrop(id, {
        ...values,
        mainImageIndex,
        attachments: newAttachmentRefs,
        imageUrls, // TODO: standardize naming to either Urls or URLs
      })

      // Delete any removed images from cloud storage
      await firebase.deleteRemovedImagesFromStorage(
        prevData.attachments,
        newAttachmentRefs
      )

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
      <DropForm onSubmit={onSubmit} initialValues={initialValues} edit />
    </PageContainer>
  )
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Wystąpił błąd",
  details: "Więcej informacji w konsoli",
}

export default EditDrop

// // Format the values for db
// const formattedData = formatDropDataForDbEdit(prevData, {
//   ...values,
//   mainImageIndex,
//   attachments: newAttachmentRefs,
//   imageUrls, // TODO: standardize naming to either Urls or URLs
// })

// // Update drop
// await firebase.drop(id).set(formattedData)

// const newAttachmentRefs = await Promise.all(
//   files.map(async (file) => {
//     // If file already has a ref, return it
//     if (file.storageRef) return file.storageRef

//     // Upload the new file and return promise containing ref
//     const snapshot = await firebase.uploadFile(
//       CONST.STORAGE_BUCKET_DROP_ATTACHMENTS,
//       file.data
//     )
//     return snapshot.ref.fullPath
//   })
// )
