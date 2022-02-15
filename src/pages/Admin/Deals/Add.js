import { useCallback } from "react"
import { useHistory } from "react-router-dom"

import { GENERIC_ERROR__DETAILS_IN_CONSOLE } from "../../../components/FlashMessages"
import { useFlash, useFirebase } from "../../../hooks"
import { CONST } from "../../../constants"
import { resetFormAndRedirect } from "../../../utils"

import DealsForm from "./Form"

const Add = () => {
  const history = useHistory()
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSubmit = useCallback(
    async (values, form) => {
      try {
        const file = values.file

        // Upload file to storage and get its ref
        const snapshot = await firebase.uploadFile(
          CONST.STORAGE_BUCKET_DEAL_ATTACHMENTS,
          file.data
        )
        const imageRef = snapshot.ref.fullPath

        // Add to database
        await firebase.createDeal({ ...values, imageRef })

        resetFormAndRedirect(form, history)("ADMIN_DEALS")
      } catch (error) {
        console.error(error)
        flashMessage(GENERIC_ERROR__DETAILS_IN_CONSOLE)
      }
    },
    [firebase, flashMessage, history]
  )

  return <DealsForm onSubmit={onSubmit} edit={false} />
}

export default Add
