import { useCallback } from "react"
import { nanoid } from "nanoid"

import {
  withAuthorization,
  isAuthenticated,
} from "../../components/UserSession"
import { PageContainer } from "../../components/Containers"
import HelmetBasics from "../../components/HelmetBasics"
import { getMainImageIndex } from "../../components/FileHandler"
import { CONST } from "../../constants"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import { resetFormAndRedirect } from "../../utils"

import NewItemForm from "./NewItemForm"

const NewItemPage = ({ history }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()

  const onSubmit = useCallback(
    async (values, form) => {
      try {
        const files = values.files
        const userId = authUser.uid
        const itemId = nanoid()

        // Upload files to storage and get their refs
        const attachments = await firebase.batchGetAttachmentRefFromCustomFile(
          `${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${userId}/${itemId}`,
          files
        )

        // Get main image ref
        const mainImageIndex = getMainImageIndex(files)

        // Add item to database
        await firebase.createItem({
          ...values,
          mainImageIndex,
          attachments,
          userId,
          id: itemId,
        })

        flashMessage(SUCCESS_MESSAGE)
        resetFormAndRedirect(form, history)("ACCOUNT_ITEMS", { id: userId })
      } catch (error) {
        console.error(error)
        flashMessage(ERROR_MESSAGE)
      }
    },
    [authUser.uid, firebase, flashMessage, history]
  )

  return (
    <PageContainer maxWidth={2}>
      <HelmetBasics title="Wystaw przedmiot" />
      <NewItemForm onSubmit={onSubmit} />
    </PageContainer>
  )
}

const SUCCESS_MESSAGE = {
  type: "success",
  text: "Dodano ogłoszenie!",
  details: "Odśwież stronę za kilka sekund by zobaczyć zmiany",
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Wystąpił błąd",
  details: "Ogłoszenie mogło nie zostać dodane",
}

export default withAuthorization(
  isAuthenticated,
  "Zaloguj się by zacząć sprzedawać"
)(NewItemPage)
