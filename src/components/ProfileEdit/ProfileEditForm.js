import React from "react"
import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"
import styled from "styled-components/macro"

import Button, { LoaderButton, ButtonContainer } from "../Button"
import { TextBlock } from "../StyledComponents"
import { ProfilePictureFF, TextFF, TextareaFF } from "../FinalFormFields"
import LoadingSpinner from "../LoadingSpinner"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const ProfileEditForm = ({ onSubmit, initialValues }) => {
	return !initialValues ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0 && !pristine}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<TextBlock size="m" bold uppercase>
							Informacje i Zdjęcie profilowe
						</TextBlock>

						<TextFF
							name="name"
							label="Nazwa użytkownika"
							placeholder="Nazwa użytkownika"
						/>
						<TextFF name="city" label="Miasto" placeholder="Miasto" />

						<TextFF
							name="messengerLink"
							label="Link do twojego messengera"
							placeholder="Link do twojego messengera"
							info="Na przykład: m.me/john.doe.420"
						/>

						<TextFF
							name="phone"
							label="Numer telefonu"
							placeholder="Numer telefonu"
							info="Do kontaktu"
						/>

						<TextareaFF name="info" label="Opis" placeholder="Dodatkowe informacje" />

						<ProfilePictureFF name="file" />

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
					</StyledForm>
				)
			}}
		/>
	)
}

export default ProfileEditForm
