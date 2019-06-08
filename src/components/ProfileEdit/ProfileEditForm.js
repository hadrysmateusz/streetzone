import React from "react"
import { Form, Field } from "react-final-form"
import styled, { css } from "styled-components/macro"

import Button, { LoaderButton, ButtonContainer } from "../Button"
import { Input, Textarea } from "../FormElements"
import validate from "./validate"
import FileHandlerSingle from "../FileHandler/FileHandlerSingle"
import { TextBlock } from "../StyledComponents"

const StyledForm = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing2);
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		gap: var(--spacing3);
	}
`

const FormElement = styled.div`
	grid-column: span 2;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		${(p) => p.small && "grid-column: span 1;"}
	}
`

const ProfileEditForm = (props) => {
	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<FormElement>
							<TextBlock size="m" bold uppercase>
								Podstawowe informacje
							</TextBlock>
						</FormElement>

						{/* Name */}
						<FormElement>
							<Field name="name">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="text"
											placeholder="Nazwa użytkownika"
											error={error}
										/>
									)
								}}
							</Field>
						</FormElement>

						{/* E-mail */}
						<FormElement>
							<Field name="email">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="email"
											placeholder="E-mail"
											info="Do kontaktu i logowania"
											error={error}
										/>
									)
								}}
							</Field>
						</FormElement>

						{/* City */}
						<FormElement>
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
						</FormElement>

						{/* Info */}
						<FormElement>
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
						</FormElement>

						<TextBlock size="m" bold uppercase>
							Kontakt
						</TextBlock>

						{/* Messenger */}
						<FormElement>
							<Field name="messengerLink">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="text"
											placeholder="Link do twojego messengera"
											info="Na przykład: m.me/john.doe.420"
											error={error}
										/>
									)
								}}
							</Field>
						</FormElement>

						{/* Phone number */}
						<FormElement>
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
						</FormElement>

						{/* Profile Picture */}
						<FormElement>
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
						</FormElement>

						<FormElement>
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
						</FormElement>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</StyledForm>
				)
			}}
		/>
	)
}

export default ProfileEditForm
