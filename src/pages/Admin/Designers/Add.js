import React from "react"
import { withRouter } from "react-router-dom"
import { nanoid } from "nanoid"

import { PageContainer } from "../../../components/Containers"

import { CONST } from "../../../constants"
import { useFirebase, useFlash } from "../../../hooks"

import Form from "./Form"
import RequestedDesigners from "./RequestedDesigners"
import { TextBlock } from "../../../components/StyledComponents"

const AddDesigner = withRouter(({ history }) => {
  const firebase = useFirebase()
  const flashMessage = useFlash()

  const onSubmit = async ({ logo, label, colorA, colorB }, form) => {
    try {
      label = label.trim()
      colorA = colorA.trim()
      colorB = colorB.trim()

      const id = nanoid()

      let data = { id, label, colorA, colorB }

      if (logo) {
        const bucket = CONST.STORAGE_BUCKET_BRAND_LOGOS
        const logoSnapshot = await firebase.uploadFile(bucket, logo.data)

        data.imageRef = logoSnapshot.ref.fullPath
      }

      await firebase.designer(id).set(data)

      setTimeout(() => {
        form.reset()
        history.goBack()
        return
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

  return <Form onSubmit={onSubmit} />
})

const AddDesignerPage = () => (
  <PageContainer>
    <TextBlock size="l" bold>
      Dodaj
    </TextBlock>
    <RequestedDesigners />
    <AddDesigner />
  </PageContainer>
)

export default AddDesignerPage
