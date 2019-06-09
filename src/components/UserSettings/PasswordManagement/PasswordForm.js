import React from "react"
import { Form } from "react-final-form"
import styled from "styled-components/macro"

import { LoaderButton } from "../../Button"
import InfoBox from "../../InfoBox"
import { TextFF } from "../../FinalFormFields"

import validate from "./validate"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const AddPasswordForm = ({ onSubmit }) => {
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

					<LoaderButton
						text="Zapisz"
						type="submit"
						isLoading={submitting}
						disabled={submitting || pristine || invalid}
						primary
						fullWidth
					/>
				</StyledForm>
			)}
		/>
	)
}

export default AddPasswordForm
