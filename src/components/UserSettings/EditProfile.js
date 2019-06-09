import React, { useState, useEffect } from "react"
import { Form } from "react-final-form"
import { Prompt } from "react-router-dom"
import styled from "styled-components/macro"

import LoadingSpinner from "../LoadingSpinner"
import { CustomFile } from "../FileHandler"
import Button, { LoaderButton, ButtonContainer } from "../Button"
import { ProfilePictureFF, TextFF, TextareaFF } from "../FinalFormFields"
import ErrorBox from "../ErrorBox"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import getProfilePictureURL from "../../utils/getProfilePictureURL"
import { FORM_ERR } from "../../constants"

import { Heading } from "./common"

const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
`

const ProfileEditForm = ({ onSubmit, initialValues, onCancel }) => {
	const validate = ({ name }) => {
		const errors = {}

		if (!name) {
			errors.name = FORM_ERR.IS_REQUIRED
		}

		return errors
	}

	return !initialValues ? (
		<LoadingSpinner />
	) : (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			initialValues={initialValues}
			render={({ form, handleSubmit, submitting, pristine, values }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0 && !pristine}
							message={() => "Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"}
						/>

						<Heading>Informacje i Zdjęcie profilowe</Heading>

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
				)
			}}
		/>
	)
}

const EditProfile = () => {
	const authUser = useAuthentication()
	const firebase = useFirebase()
	const flashMessage = useFlash()
	const [initialValues, setInitialValues] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		// get all the basic values
		let initialValues = {
			name: authUser.name,
			email: authUser.email,
			city: authUser.city,
			phone: authUser.phone,
			info: authUser.info,
			messengerLink: authUser.messengerLink
		}

		// get the profile picture and create CustomFile
		if (authUser.profilePictureURLs && authUser.profilePictureURLs.length > 0) {
			const file = new CustomFile({
				storageRef: authUser.profilePictureRef || null,
				previewUrl: getProfilePictureURL(authUser, "L"),
				isUploaded: true
			})
			initialValues.file = file
		}

		// set initialValues for the form
		setInitialValues(initialValues)
	}, [authUser])

	const getNewImageInfo = async (file) => {
		// if there is no file, empty the fields
		if (!file) {
			return {
				profilePictureRef: null,
				profilePictureURLs: null
			}
		}

		// if the file hsn't changed, don't make changes
		if (file.isUploaded) return {}

		// upload the new file
		const snapshot = await firebase.uploadFile(
			`profile-pictures/${authUser.uid}`,
			file.data
		)

		// get the new ref and temporary url
		const newFileRef = snapshot.ref.fullPath
		const newUrl_temp = await firebase.getImageURL(newFileRef)

		return { profilePictureRef: newFileRef, profilePictureURLs: [newUrl_temp] }
	}

	const onSubmit = async (values) => {
		try {
			// Get ref of current profile picture
			const oldFileRef = authUser.profilePictureRef || null

			// Get the values of profile picture related fields
			const newImageInfo = await getNewImageInfo(values.file)

			// Format the data for database
			const data = {
				name: values.name || initialValues.name || null,
				city: values.city || null,
				phone: values.phone || null,
				info: values.info || null,
				messengerLink: values.messengerLink || null,
				...newImageInfo
			}

			// Update the user with the new data
			await firebase.user(authUser.uid).update(data)

			// Remove old file if it's different from the new one
			if (oldFileRef && oldFileRef !== data.profilePictureRef) {
				await firebase.file(oldFileRef).delete()
			}

			flashMessage("Zmiany zostały zapisane")
		} catch (err) {
			console.log(err)
			setError("Wystąpił błąd, zmiany mogły nie zostać zapisane")
		}
	}

	const isLoading = !initialValues

	return isLoading ? (
		<LoadingSpinner />
	) : (
		<>
			<ProfileEditForm
				onSubmit={onSubmit}
				initialValues={initialValues}
				onCancel={() => setError(null)}
			/>
			<ErrorBox error={error} />
		</>
	)
}

export default EditProfile
