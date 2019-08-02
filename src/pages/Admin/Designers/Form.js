import moment from "moment"
import styled from "styled-components/macro"

import React from "react"
import shortid from "shortid"
import { Form, Field } from "react-final-form"

import BlackBox from "../../../components/BlackBox"
import Button, { LoaderButton, ButtonContainer } from "../../../components/Button"
import { Input } from "../../../components/FormElements"
import { TextBlock } from "../../../components/StyledComponents"
import { FileHandlerSingle } from "../../../components/FileHandler"
import { PageContainer } from "../../../components/Containers"
import LoadingSpinner from "../../../components/LoadingSpinner"

import { FORM_ERR, CONST } from "../../../constants"

import { useFirestoreCollection, useFirebase } from "../../../hooks"

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

const Swatch = styled.div`
	width: 40px;
	height: 40px;
	background-color: ${(p) => p.color};
	border: 1px dashed gray;
`

export default ({ onSubmit, initialValues, edit }) =>
	!initialValues && edit ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			initialValues={initialValues}
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
					</form>
				)
			}}
		/>
	)
