import { useState, useEffect, useCallback } from "react"
import { useRouteMatch, useHistory } from "react-router-dom"

import { CustomFile } from "../../../components/FileHandler"
import { GENERIC_ERROR__DETAILS_IN_CONSOLE } from "../../../components/FlashMessages"
import { useFlash, useFirebase } from "../../../hooks"
import { CONST } from "../../../constants"
import { resetFormAndRedirect } from "../../../utils"

import DealsForm from "./Form"

const Edit = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const [initialValues, setInitialValues] = useState(null)

  const id = match?.params?.id

  // TODO: handle missing id
  useEffect(() => {
    ;(async () => {
      setInitialValues(null)

      const snap = await firebase.deal(id).get()

      let data = snap.data()

      // Get attachment urls for previews
      const imageUrl = await firebase.getImageURL(data.imageRef)

      // create CustomFile objects with the fetched previewUrls
      const file = new CustomFile({
        storageRef: data.imageRef,
        previewUrl: imageUrl,
        isUploaded: true,
      })

      setInitialValues({ ...data, file })
    })()
  }, [firebase, id])

  const onSubmit = useCallback(
    async (values, form) => {
      try {
        const file = values.file

        // If file was changed, upload it to storage and get its ref
        if (file.data && !file.isUploaded) {
          const snapshot = await firebase.uploadFile(
            CONST.STORAGE_BUCKET_DEAL_ATTACHMENTS,
            file.data
          )
          values.imageRef = snapshot.ref.fullPath
        } else {
          values.imageRef = initialValues.imageRef
        }

        // Update
        await firebase.updateDeal(id, { ...values })

        // Remove files associated with the old ref
        await firebase.removeAllImagesOfRef(initialValues.imageRef)

        resetFormAndRedirect(form, history)("ADMIN_DEALS")
      } catch (error) {
        console.error(error)
        flashMessage(GENERIC_ERROR__DETAILS_IN_CONSOLE)
      }
    },
    [firebase, flashMessage, history, id, initialValues.imageRef]
  )

  return (
    <DealsForm onSubmit={onSubmit} initialValues={initialValues} edit={true} />
  )
}

export default Edit
