import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { CustomFile, getMainImageIndex } from "../../components/FileHandler"
import ItemNotFound from "../../components/ItemNotFound"
import PageHeading from "../../components/PageHeading"
import HelmetBasics from "../../components/HelmetBasics"
import { NotFoundError } from "../../errors"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import { route, resetFormAndGoBack } from "../../utils"
import { CONST } from "../../constants"

import EditItemForm from "./EditItemForm"
import { formatDataForEditForm } from "./helpers"

const EditItemPage = ({ match }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()
  const history = useHistory()
  const location = useLocation()

  const [error, setError] = useState(null)
  const [initialData, setInitialData] = useState(null)
  const [item, setItem] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        // Get item from database
        let item = await firebase.getItemData(match.params.id)

        if (!item) throw new NotFoundError()

        if (item.userId !== authUser.uid) {
          history.replace(route("SIGN_IN"), {
            redirectTo: location,
            redirectReason: {
              message: "Nie masz wystarczających pozwoleń",
            },
          })
        }

        // Get item attachments' refs and urls for previews
        const imageURLs = await firebase.batchGetImageURLs(item.attachments)

        // create CustomFile objects with the fetched previewUrls
        const files = item.attachments.map((attachment, i) => {
          return new CustomFile({
            storageRef: attachment,
            previewUrl: imageURLs[i],
            isUploaded: true,
            isMain: i === item.mainImageIndex,
          })
        })

        // Format data for the form
        const initialData = formatDataForEditForm(
          item.price,
          item.condition,
          item.description,
          files
        )

        setInitialData(initialData)
        setItem(item)
      } catch (err) {
        if (err instanceof NotFoundError) {
          setError(err)
        } else {
          throw err
        }
      }
    })()
  }, [match, authUser, firebase, history, location])

  const onSubmit = async ({ files, price, description, condition }, form) => {
    try {
      const itemId = match.params.id

      const newAttachmentRefs =
        await firebase.batchGetAttachmentRefFromCustomFile(
          `${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${item.userId}/${item.id}`,
          files
        )

      // Get main image ref
      const mainImageIndex = getMainImageIndex(files)

      // Update item in firestore
      await firebase.updateItem(itemId, {
        price,
        description,
        condition,
        mainImageIndex,
        attachments: newAttachmentRefs,
      })

      // Get just the old refs
      let oldRefs = initialData.files.map((file) => file.storageRef)

      // Remove files associated with removed images
      await firebase.deleteRemovedImagesFromStorage(oldRefs, newAttachmentRefs)

      flashMessage(SUCCESS_MESSAGE)
      resetFormAndGoBack(form, history)()
    } catch (error) {
      console.error(error)
      flashMessage(ERROR_MESSAGE)
    }
  }

  return (
    <>
      <HelmetBasics title="Usuń ogłoszenie" />
      <PageContainer maxWidth={2}>
        {error ? (
          <ItemNotFound />
        ) : !initialData || !item ? (
          <LoadingSpinner />
        ) : (
          <>
            <PageHeading emoji={"🖊️"}>Edytuj {item.name}</PageHeading>
            <EditItemForm initialValues={initialData} onSubmit={onSubmit} />
          </>
        )}
      </PageContainer>
    </>
  )
}

const SUCCESS_MESSAGE = {
  type: "success",
  text: "Edytowano pomyślnie",
  details: "Odśwież stronę za kilka sekund by zobaczyć zmiany",
  ttl: 6000,
}

const ERROR_MESSAGE = {
  type: "error",
  text: "Wystąpił błąd",
  details: "Zmiany mogły nie zostać zapisane",
}

export default EditItemPage
