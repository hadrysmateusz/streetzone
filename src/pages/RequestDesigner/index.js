import React from "react"
import { PageContainer } from "../../components/Containers"
import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"
import styled from "styled-components/macro"
import shortid from "shortid"

import { LoaderButton, ButtonContainer, BackButton } from "../../components/Button"
import { TextFF } from "../../components/FinalFormFields"
import PageHeading from "../../components/PageHeading"

import { useFirebase, useAuthentication, useFlash } from "../../hooks"

const Info = styled.div`
	color: var(--gray0);
	text-transform: uppercase;
	margin: var(--spacing3) 0;
	text-align: center;
	font-size: var(--fs-xs);
`

const StyledForm = styled.form`
	max-width: 430px;
	margin: 0 auto;
`

const RequestDesigner = ({ history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const flashMessage = useFlash()

	const onSubmit = async (values, form) => {
		const id = shortid.generate()

		let payload = {
			name: values.name,
			user: authUser ? authUser.uid : null,
			requestedAt: Date.now(),
			id
		}

		// Add drop to database
		await firebase.db
			.collection("requestedDesigners")
			.doc(id)
			.set(payload)

		// show flash message
		flashMessage({ type: "success", textContent: "Wysłano prośbę o dodanie" })

		// Reset form
		setTimeout(form.reset)

		// Redirect
		history.goBack()
	}

	return (
		<PageContainer>
			<PageHeading emoji={"🏷️"}>Dodaj projektanta / markę</PageHeading>

			<Form
				onSubmit={onSubmit}
				render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
					return (
						<StyledForm onSubmit={handleSubmit}>
							<Info>
								{/* TODO: make this copy more accurate once all of the functionality is finished */}
								Podaj nazwę marki lub projektanta. Po weryfikacji, dodamy ją do systemu. W
								międzyczasie możesz użyć marki "Inny" by wystawić swój przedmiot. Gdy
								marka zostanie dodana, będziesz mógł zedytować swoje ogłoszenie.
							</Info>

							<TextFF label="Nazwa projektanta / marki" placeholder="Nazwa" name="name" />

							<ButtonContainer vertical>
								<LoaderButton text="OK" isLoading={submitting} primary big />
								<BackButton />
							</ButtonContainer>
						</StyledForm>
					)
				}}
			/>
		</PageContainer>
	)
}

export default withRouter(RequestDesigner)
