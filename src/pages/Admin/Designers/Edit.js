import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"

import { CustomFile } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"
import { getImageUrl } from "../../../utils/getImageUrl"
import { TextBlock } from "../../../components/StyledComponents"
import { useFirebase, useFlash } from "../../../hooks"
import { CONST } from "../../../constants"

import Form from "./Form"

const EditDesigner = ({ history, match }) => {
  const firebase = useFirebase()
  const [initialValues, setInitialValues] = useState(null)
  const flashMessage = useFlash()
  const id = match.params.id

  useEffect(() => {
    const getData = async () => {
      const snap = await firebase.designer(id).get()

      let data = snap.data()

      // Get attachment urls for previews
      const imageUrl = getImageUrl(data.imageRef, "M")

      // create CustomFile objects with the fetched previewUrls
      const logo = new CustomFile({
        storageRef: data.imageRef,
        previewUrl: imageUrl,
        isUploaded: true,
      })

      setInitialValues({ ...data, logo })
    }

    getData()
  }, [firebase, id])

  const onSubmit = async ({ logo, label, colorA, colorB }, form) => {
    try {
      label = label.trim()
      colorA = colorA.trim()
      colorB = colorB.trim()

      let data = { label, colorA, colorB }

      // TODO: delete old image

      if (logo && !logo.isUploaded) {
        const logoSnapshot = await firebase.uploadFile(CONST.STORAGE_BUCKET_BRAND_LOGOS, logo.data)

        data.imageRef = logoSnapshot.ref.fullPath
      }

      await firebase.designer(id).update(data)

      setTimeout(() => {
        form.reset()
        history.goBack()
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
      <TextBlock size="l" bold>
        Edytuj
      </TextBlock>
      <Form onSubmit={onSubmit} initialValues={initialValues} />
    </PageContainer>
  )
}

export default withRouter(EditDesigner)
