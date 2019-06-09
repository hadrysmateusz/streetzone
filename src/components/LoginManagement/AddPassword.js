import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { LoaderButton, ButtonContainer } from "../Button"
import InfoBox from "../InfoBox"
import { TextFF } from "../FinalFormFields"
import { FORM_ERR, CONST } from "../../constants"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const validate = (values) => {
	const { password, passwordConfirm } = values
	const errors = {}

	// Password
	if (!password) {
		errors.password = FORM_ERR.IS_REQUIRED
	} else if (password.length < CONST.MIN_PASSWORD_LENGTH) {
		errors.password = FORM_ERR.PASSWORD_TOO_SHORT
	}

	// Password Confirm
	if (!passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.IS_REQUIRED
	} else if (password !== passwordConfirm) {
		errors.passwordConfirm = FORM_ERR.PASSWORDS_NOT_MATCHING
	}

	return errors
}

const AddPassword = ({ onLink }) => {
	const onSubmit = async (values) => {
		await onLink(values.password)
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ handleSubmit, submitting, pristine, values, invalid }) => (
				<StyledForm onSubmit={handleSubmit}>
					<InfoBox>
						Jeśli za pierwszym razem zalogowałeś się używając jednego z kont
						społecznościowych, możesz również dodać hasło by logować się za pomocą e-mailu
						i hasła.
					</InfoBox>

					<TextFF name="password" placeholder="Hasło" password />
					<TextFF name="passwordConfirm" placeholder="Potwierdź hasło" password />

					<ButtonContainer>
						<LoaderButton
							text="Zapisz"
							type="submit"
							isLoading={submitting}
							disabled={submitting || pristine || invalid}
							primary
							fullWidth
						/>
					</ButtonContainer>
				</StyledForm>
			)}
		/>
	)
}

export default AddPassword
