import React from "react"
import { Form, Field } from "react-final-form"
import styled, { css } from "styled-components/macro"

import Button, { LoaderButton, ButtonContainer } from "../Button"
import { FieldRow } from "../Basics"
import { Input, Textarea } from "../FormElements"
import validate from "./validate"
import FileHandlerSingle from "../FileHandler/FileHandlerSingle"
import { TextBlock } from "../StyledComponents"

const FieldsContainer = styled.div`
	margin-top: var(--spacing3);
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing3);
	grid-template-areas:
		"name email"
		"city phone"
		"info info"
		"photo photo";
`

const ProfileEditForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<form onSubmit={handleSubmit}>
						<TextBlock size="m" bold uppercase>
							Podstawowe informacje
						</TextBlock>
						<FieldsContainer>
							{/* Name */}
							<FieldRow gridArea="name">
								<Field name="name">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Imię i nazwisko"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* E-mail */}
							<FieldRow gridArea="email">
								<Field name="email">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input {...input} type="email" placeholder="E-mail" error={error} />
										)
									}}
								</Field>
							</FieldRow>

							{/* City */}
							<FieldRow gridArea="city">
								<Field name="city">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Miejsce zamieszkania"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* Phone number */}
							<FieldRow gridArea="phone">
								<Field name="phone">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Input
												{...input}
												type="text"
												placeholder="Numer telefonu"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* Info */}
							<FieldRow gridArea="info">
								<Field name="info">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Textarea
												{...input}
												placeholder="Dodatkowe informacje"
												error={error}
											/>
										)
									}}
								</Field>
							</FieldRow>

							{/* Avatar */}
							<FieldRow gridArea="photo">
								<TextBlock size="m" bold uppercase>
									Zdjęcie profilowe
								</TextBlock>
								<Field name="file">
									{({ input, meta }) => {
										return (
											<FileHandlerSingle
												{...input}
												containerStyles={css`
													width: 220px;
													height: 220px;
													border-radius: 50%;
													margin: var(--spacing3) 0;
												`}
											/>
										)
									}}
								</Field>
							</FieldRow>
						</FieldsContainer>

						<ButtonContainer centered>
							<LoaderButton
								text="Zapisz"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
								fullWidth
							/>
							<Button
								text="Anuluj"
								type="button"
								disabled={submitting || pristine}
								onClick={form.reset}
								fullWidth
							>
								Anuluj
							</Button>
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

export default ProfileEditForm
