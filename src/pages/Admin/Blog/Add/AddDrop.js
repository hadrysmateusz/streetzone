import React from "react"
import { Prompt } from "react-router-dom"
import { withRouter } from "react-router-dom"
import { Form } from "react-final-form"
import "react-datetime/css/react-datetime.css"

import { LoaderButton, ButtonContainer } from "../../../../components/Button"
import { PageContainer } from "../../../../components/Containers"
import DisplayJSONButton from "../../../../components/DisplayJSONButton"
import useFirebase from "../../../../hooks/useFirebase"
import {
	formatDropDataForDb,
	MODE,
	dateFormat
} from "../../../../utils/formatting/formatDropData"
import { ROUTES, ITEM_SCHEMA, CONST } from "../../../../constants"

import {
	TextFF,
	DropdownFF,
	FileHandlerFF,
	MultiTextInputFF,
	TextareaFF,
	NumberFF
} from "../FinalFormFields"
import { StyledForm } from "../StyledComponents"

const AddPostForm = ({ onSubmit }) => {
	return (
		<Form
			onSubmit={onSubmit}
			render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
				return (
					<StyledForm onSubmit={handleSubmit}>
						<Prompt
							when={Object.values(values).length > 0}
							message={(location) =>
								"Zmiany nie zostały zapisane. Czy napewno chcesz wyjść?"
							}
						/>

						<TextFF label="Nazwa przedmiotu" placeholder="Nazwa" name="name" />

						<TextareaFF
							label="Opis"
							placeholder="Kilka słów o przedmiocie. Jego historia itd."
							name="description"
						/>

						{/* TODO: add input mask */}
						<TextFF
							label="Data i czas dropu"
							placeholder={dateFormat}
							name="dropsAtString"
							info={`Przestrzegaj formatu ${dateFormat}`}
						/>

						<DropdownFF
							label="Projektanci przedmiotu"
							name="designers"
							placeholder="Projektanci / Marki"
							options={ITEM_SCHEMA.designerOptions}
							isClearable={true}
							isSearchable={true}
							isMulti={true}
							info="Jedna lub więcej w przypadku kolaboracji"
						/>

						<DropdownFF
							label="Kategoria przedmiotu"
							name="itemCategory"
							options={ITEM_SCHEMA.categoryOptions}
							isSearchable={false}
							placeholder="Kategoria"
						/>

						<NumberFF
							label="Cena przedmiotu"
							placeholder="Cena (opcjonalne)"
							name="price"
							min="0"
							step="1"
						/>

						<TextFF
							label="Nakład przedmiotu"
							placeholder="np. 500 sztuk, Limitowany (opcjonalne)"
							name="howMany"
							info="Dokładna liczba lub opis"
						/>

						<FileHandlerFF label="Zdjęcia" name="files" />

						<MultiTextInputFF
							label="Gdzie kupić?"
							placeholder="Linki (zatwierdzaj Enterem) (Opcjonalne)"
							name="buyAt"
						/>

						<ButtonContainer>
							<LoaderButton
								text="Gotowe"
								type="submit"
								big
								fullWidth
								primary
								isLoading={submitting}
								disabled={submitting || pristine}
							/>
							<DisplayJSONButton big values={values} />
						</ButtonContainer>
					</StyledForm>
				)
			}}
		/>
	)
}

const AddPost = ({ history }) => {
	const firebase = useFirebase()

	const onSubmit = async (values, actions) => {
		try {
			const files = values.files

			// Upload files to storage and get their refs
			const attachments = await firebase.batchUploadFiles(
				CONST.STORAGE_BUCKET_BLOG_ATTACHMENTS,
				files
			)

			// Get main image index
			const mainImageIndex = files.findIndex((a) => a.isMain)

			// Format the values for db
			const formattedData = formatDropDataForDb(
				{ ...values, mainImageIndex, attachments },
				MODE.CREATE
			)

			// Add drop to database
			await firebase.drop(formattedData.id).set(formattedData)

			// Reset form
			actions.reset()

			// Redirect
			history.push(ROUTES.ADMIN_BLOG)
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	return (
		<PageContainer>
			<AddPostForm onSubmit={onSubmit} />
		</PageContainer>
	)
}

export default withRouter(AddPost)
