import React from "react"
import { withRouter } from "react-router-dom"
import shortid from "shortid"

import { PageContainer } from "../../../components/Containers"

import { CONST } from "../../../constants"
import { useFirebase } from "../../../hooks"

import Form from "./Form"
import RequestedDesigners from "./RequestedDesigners"
import { TextBlock } from "../../../components/StyledComponents"

const AddDesigner = withRouter(({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async ({ logo, label, colorA, colorB }, form) => {
		try {
			label = label.trim()
			colorA = colorA.trim()
			colorB = colorB.trim()

			const id = shortid.generate()

			let data = { id, label, colorA, colorB }

			if (logo) {
				const logoSnapshot = await firebase.uploadFile(
					CONST.STORAGE_BUCKET_BRAND_LOGOS,
					logo.data
				)

				data.imageRef = logoSnapshot.ref.fullPath
			}

			await firebase.designer(id).set(data)

			setTimeout(() => {
				form.reset()
				history.goBack()
			})
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
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
