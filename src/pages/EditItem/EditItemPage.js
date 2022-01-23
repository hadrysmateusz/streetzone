import { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { withAuthentication } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { CustomFile } from "../../components/FileHandler"
import ItemNotFound from "../../components/ItemNotFound"
import PageHeading from "../../components/PageHeading"
import HelmetBasics from "../../components/HelmetBasics"

import { NotFoundError } from "../../errors"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"
import { formatItemDataForDb, MODE } from "../../utils/formatting/formatItemData"
import { CONST } from "../../constants"

import EditItemForm from "./EditItemForm"
import { formatDataForEditForm } from "./helpers"

const EditItemPage = ({ match, history, location }) => {
  const firebase = useFirebase()
  const authUser = useAuthentication()
  const flashMessage = useFlash()
  const [error, setError] = useState(null)
  const [initialData, setInitialData] = useState(null)
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = async () => {
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
    }

    getItem()
  }, [match, authUser, firebase, history, location])

  const onSubmit = async ({ files, price, description, condition }, form) => {
    try {
      // Upload NEW files and get ALL refs
      const newRefs = await Promise.all(
        files.map(async (file) => {
          // If file already has a ref, return it
          if (file.storageRef) return file.storageRef

          // Upload the new file and return promise containing ref
          const snapshot = await firebase.uploadFile(
            `${CONST.STORAGE_BUCKET_ITEM_ATTACHMENTS}/${item.userId}/${item.id}`,
            file.data
          )
          return snapshot.ref.fullPath
        })
      )

      // Get main image ref
      const mainImageIndex = files.findIndex((a) => a.isMain)

      // Format the data
      const data = formatItemDataForDb(
        { price, description, condition, mainImageIndex, attachments: newRefs },
        MODE.EDIT
      )

      // Update item
      await firebase.item(match.params.id).update(data)

      // Get just the old refs
      let oldRefs = initialData.files.map((file) => file.storageRef)

      // Old refs no longer present in new refs are marked for deletion
      let refsToDelete = oldRefs.filter((oldRef) => !newRefs.includes(oldRef))

      // Remove files associated with the marked refs
      for (const storageRef of refsToDelete) {
        firebase.removeAllImagesOfRef(storageRef)
      }

      setTimeout(() => {
        flashMessage({
          type: "success",
          text: "Edytowano pomyślnie",
          details: "Odśwież stronę za kilka sekund by zobaczyć zmiany",
          ttl: 6000,
        })
        form.reset()
        history.goBack()
        return
      })
    } catch (error) {
      console.error(error)
      flashMessage({
        type: "error",
        text: "Wystąpił błąd",
        details: "Zmiany mogły nie zostać zapisane",
      })
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

export default compose(withAuthentication, withRouter)(EditItemPage)
