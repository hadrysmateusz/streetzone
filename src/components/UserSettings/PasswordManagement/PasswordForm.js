import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import Button, { LoaderButton, ButtonContainer } from "../../Button"

import { TextFF } from "../../FinalFormFields"

import validate from "./validate"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const AddPasswordForm = ({ onSubmit, onCancel }) => {
	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ form, handleSubmit, submitting, pristine, values }) => (
				<StyledForm onSubmit={handleSubmit}>
					<TextFF name="password" placeholder="Hasło" password />
					<TextFF name="passwordConfirm" placeholder="Potwierdź hasło" password />

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
							onClick={() => {
								form.reset()
								onCancel()
							}}
							fullWidth
						>
							Anuluj
						</Button>
					</ButtonContainer>
				</StyledForm>
			)}
		/>
	)
}

export default AddPasswordForm
