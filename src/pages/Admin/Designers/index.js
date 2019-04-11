import React from "react"
import shortid from "shortid"

import LoadingSpinner from "../../../components/LoadingSpinner"
import styled from "styled-components/macro"

import Button, { LoaderButton, ButtonContainer } from "../../../components/Button"
import { Input } from "../../../components/FormElements"
import { TextBlock } from "../../../components/StyledComponents"
import { FileHandlerSingle } from "../../../components/FileHandler"
import { Form, Field } from "react-final-form"
import useFirebase from "../../../hooks/useFirebase"
import useDesigners from "../../../hooks/useDesigners"
import { FORM_ERR } from "../../../constants"

const Swatch = styled.div`
	width: 40px;
	height: 40px;
	background-color: ${(p) => p.color};
	border: 1px dashed gray;
`

const GradientSwatch = styled.div`
	width: 100%;
	height: 120px;
	background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
`

const FlexContainer = styled.div`
	display: grid;
	grid-auto-columns: 1fr min-content;
	grid-auto-flow: column;
`

const LogoContainer = styled.div`
	height: 120px;
	width: 120px;
	border: 1px dashed black;
	position: relative;
	z-index: 70;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-image: ${(p) => `url(${p.url})`};
`

const DesignerItemContainer = styled.div`
	margin: var(--spacing2) 0;
	border: 1px solid black;
	padding: var(--spacing2);
`

const DesignerItem = ({ designer }) => {
	const firebase = useFirebase()

	const { id, logoURL, label, colorA, colorB } = designer

	const onDelete = (id) => {
		try {
			const shouldDelete = window.confirm(`Do you really want to delete "${label}"?`)
			if (shouldDelete) {
				firebase.designer(id).delete()
			}
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	return (
		<DesignerItemContainer>
			<TextBlock size="l" bold>
				{label}
			</TextBlock>
			<FlexContainer>
				<GradientSwatch colorA={colorA} colorB={colorB} />
				<LogoContainer url={logoURL} />
			</FlexContainer>
			<Button onClick={() => onDelete(id)}>Delete</Button>
		</DesignerItemContainer>
	)
}

const AddDesigner = () => {
	const firebase = useFirebase()

	const onSubmit = async ({ logo, label, colorA, colorB }, actions) => {
		try {
			label = label.trim()
			colorA = colorA.trim()
			colorB = colorB.trim()

			const id = shortid.generate()

			let data = { id, label, colorA, colorB }

			if (logo) {
				const imageId = shortid.generate()
				const logoSnapshot = await firebase.uploadFile(
					`brand-logos/${imageId}`,
					logo.data
				)
				const logoRef = logoSnapshot.ref.fullPath
				const logoURL = await firebase.getImageURL(logoRef)

				data.logoRef = logoRef
				data.logoURL = logoURL
			}

			await firebase.designer(id).set(data)

			// Reset form
			actions.reset()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	const validate = ({ logo, label, colorA, colorB }) => {
		const errors = {}

		if (!label) {
			errors.label = FORM_ERR.IS_REQUIRED
		}

		if (!colorA) {
			errors.colorA = FORM_ERR.IS_REQUIRED
		}

		if (!colorB) {
			errors.colorB = FORM_ERR.IS_REQUIRED
		}

		console.log(errors)
		return errors
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ handleSubmit, submitting, pristine, form, values }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="label">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return <Input {...input} type="text" placeholder="Nazwa" error={error} />
							}}
						</Field>
						<Field name="colorA">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<FlexContainer>
										<Input {...input} type="text" placeholder="Kolor A" error={error} />
										<Swatch color={input.value} />
									</FlexContainer>
								)
							}}
						</Field>
						<Field name="colorB">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<FlexContainer>
										<Input {...input} type="text" placeholder="Kolor B" error={error} />
										<Swatch color={input.value} />
									</FlexContainer>
								)
							}}
						</Field>

						<GradientSwatch colorA={values.colorA} colorB={values.colorB} />

						<Field name="logo">
							{({ input, meta }) => {
								return <FileHandlerSingle {...input} error={meta.error} />
							}}
						</Field>

						<ButtonContainer centered>
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
							/>
						</ButtonContainer>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

const DesignersDb = () => {
	const designers = useDesigners()
	const isLoading = !designers
	const isEmpty = !designers || designers.length === 0

	return (
		<div>
			<TextBlock size="xl" bold>
				Designers
			</TextBlock>

			<TextBlock size="m" color="gray0">
				Add designer
			</TextBlock>

			<AddDesigner />

			<TextBlock size="m" color="gray0">
				All designers
			</TextBlock>

			<div>
				{isLoading ? (
					<LoadingSpinner fixedHeight />
				) : (
					!isEmpty && designers.map((item) => <DesignerItem designer={item} />)
				)}
			</div>
		</div>
	)
}

export default DesignersDb
