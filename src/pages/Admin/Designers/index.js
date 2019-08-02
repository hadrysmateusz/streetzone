import React from "react"
import shortid from "shortid"
import styled from "styled-components/macro"
import { Form, Field } from "react-final-form"
import moment from "moment"

import BlackBox from "../../../components/BlackBox"
import LoadingSpinner from "../../../components/LoadingSpinner"
import Button, { LoaderButton, ButtonContainer } from "../../../components/Button"
import { Input } from "../../../components/FormElements"
import { TextBlock } from "../../../components/StyledComponents"
import { FileHandlerSingle } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"

import { FORM_ERR, CONST } from "../../../constants"

import { useDesigners, useFirestoreCollection, useFirebase } from "../../../hooks"

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
	border: 1px dashed gray;
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

const DesignerRequest = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	padding: var(--spacing3);
	margin-bottom: var(--spacing2);

	h3 {
		margin: 0;
	}
`

const RequestedDesigners = () => {
	const requestedDesigners = useFirestoreCollection("requestedDesigners")
	const firebase = useFirebase()

	const markAsDone = async (request) => {
		console.log(request)

		// If the request was anonymous don't send any notifications
		if (!request.user) return

		const confirmDesignerAdded = firebase.functions.httpsCallable("confirmDesignerAdded")
		await confirmDesignerAdded({ userId: request.user })
		await deleteRequest(request)
	}

	const deleteRequest = async (request) => {
		const res = window.confirm(`Czy napewno usunąć prośbę (${request.name})`)
		if (!res) return

		// remove the request from the list
		await firebase.db
			.collection("requestedDesigners")
			.doc(request.id)
			.delete()
	}

	return requestedDesigners ? (
		requestedDesigners.map((request) => (
			<DesignerRequest>
				<h3>{request.name}</h3>
				<div>Requested At: {moment(request.requestedAt).format("LL")}</div>
				<ButtonContainer>
					<Button onClick={() => markAsDone(request)}>Potwierdź dodanie</Button>
					<Button danger onClick={() => deleteRequest(request)}>
						Usuń
					</Button>
				</ButtonContainer>
			</DesignerRequest>
		))
	) : (
		<div>Brak</div>
	)
}

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

				data.logoRef = logoSnapshot.ref.fullPath
			}

			await firebase.designer(id).set(data)

			// Reset form
			setTimeout(form.reset)
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	const validate = ({ label, colorA, colorB }) => {
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
								return (
									<FileHandlerSingle
										{...input}
										error={meta.error}
										variant="small-square"
									/>
								)
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
		<PageContainer>
			<TextBlock size="xl" bold>
				Designers
			</TextBlock>

			<TextBlock size="m" color="gray0">
				Requested Designers
			</TextBlock>

			<RequestedDesigners />

			<TextBlock size="m" color="gray0">
				Add designer
			</TextBlock>

			<AddDesigner />

			<BlackBox>
				Dodawanie i usuwanie nie odświeża strony. Odśwież ręcznie by zobaczyć zmiany.
			</BlackBox>

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
		</PageContainer>
	)
}

export default DesignersDb
