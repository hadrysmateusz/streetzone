import React, { Component } from "react"
import shortid from "shortid"
import { Form, Field } from "react-final-form"

import { withAuthentication } from "../../components/UserSession"
import { LoaderButton } from "../../components/Button"
import { FieldRow, FieldLabel } from "../../components/Basics"
import { FormError, Input } from "../../components/FormElements"
import { FileHandler } from "../../components/FileHandler"
import { ITEM_SCHEMA, CONST } from "../../constants"

function randInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

class NewItemPage extends Component {
	state = { isLoading: false }

	uploadItem = async (values) => {
		try {
			const { firebase } = this.props
			const files = values.files

			// Look for the document with correct id
			const userSnap = await this.props.firebase.user(values.userId).get()
			// If the user isn't found throw an error
			if (!userSnap.exists) throw new Error("Nie znaleziono użytkownika")
			// Get user data
			const oldItems = userSnap.data().items

			// Upload files to storage and get their refs
			const attachments = await Promise.all(
				files.map(async (file) => {
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			// Generate unique id
			const itemId = shortid.generate()

			// Format the data
			const data = {
				name: values.name,
				designers: values.designers,
				price: Number.parseInt(values.price),
				category: values.category,
				size: values.size || null,
				description: values.description || "",
				condition: Number.parseFloat(values.condition),
				status: ITEM_SCHEMA.status.available,
				createdAt: Date.now(),
				bumpedAt: Date.now(),
				modifiedAt: null,
				itemId,
				userId: values.userId,
				attachments
			}

			// Add item to database
			await firebase.item(itemId).set(data)

			// Add the new item's id to user's items
			const items = [...oldItems, itemId]
			await firebase.user(values.userId).update({ items })

			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	onSubmit = async (values, actions) => {
		const availableDesigners = (await this.props.firebase.db
			.collection("designers")
			.get()).docs.map((doc) => doc.data())

		const availableNames = [
			"Fajne ale drogie",
			"O takie coś",
			"Rzecz",
			"Przykładowy itemek",
			"Kolejny cuś",
			"Super cośtam 2000",
			"Przedmiot 75"
		]

		const availableCategories = Object.values(ITEM_SCHEMA.categories)

		const usersSnapshot = await this.props.firebase.db.collection("users").get()
		const usersDocsSnapshot = usersSnapshot.docs
		const availableUserIds = usersDocsSnapshot.map((doc) => doc.id)

		for (let i = 0; i < values.numberOfItems; i++) {
			// name
			const name = availableNames[randInt(0, availableNames.length - 1)]

			// category
			const category = availableCategories[randInt(0, availableCategories.length - 1)]

			// designers
			let designers = []
			const nOfDesigners = randInt(1, 3)
			for (let i = 0; i < nOfDesigners; i++) {
				designers.push(
					availableDesigners[randInt(0, availableDesigners.length - 1)].label
				)
			}
			designers = designers.reduce(
				(acc, curr) => (!acc.includes(curr) ? [...acc, curr] : acc),
				[]
			)

			// price
			const price = randInt(50, 3500)

			// userId
			const userId = values.randomUsers
				? availableUserIds[randInt(0, availableUserIds.length - 1)]
				: this.props.authUser.uid

			// condition
			const condition = randInt(5, 11)

			// size
			let sizeCategory
			if (category === ITEM_SCHEMA.categories.akcesoria) {
				sizeCategory = null
			} else if (category === ITEM_SCHEMA.categories.spodnie) {
				sizeCategory = "spodnie"
			} else if (category === ITEM_SCHEMA.categories.buty) {
				sizeCategory = "buty"
			} else if (
				[ITEM_SCHEMA.categories.tee, ITEM_SCHEMA.categories.longsleeve].includes(category)
			) {
				sizeCategory = "top"
			}

			let size
			if (sizeCategory) {
				const availablSizes = ITEM_SCHEMA.size[sizeCategory]
				size = sizeCategory + "-" + availablSizes[randInt(0, availablSizes.length - 1)]
			} else {
				size = null
			}

			// description
			let description = await fetch(
				"https://baconipsum.com/api/?type=meat-and-filler&paras=1"
			)
			description = (await description.json())[0]

			// files
			const nOfAllFiles = values.files.length
			const nOfFiles = Math.min(nOfAllFiles, randInt(1, CONST.ATTACHMENTS_MAX_COUNT))
			const lastAvailableStartIndex = nOfAllFiles - nOfFiles
			const startIndex = randInt(0, lastAvailableStartIndex)

			let files = values.files.slice(startIndex, startIndex + nOfFiles)

			await this.uploadItem({
				name,
				designers,
				price,
				userId,
				category,
				condition,
				size,
				description,
				files
			})
		}
		actions.reset()
	}

	render() {
		return (
			<div>
				<hr />
				<h4>Add</h4>
				<Form
					onSubmit={this.onSubmit}
					render={({ form, handleSubmit, submitting, pristine, values, ...rest }) => {
						return (
							<form onSubmit={handleSubmit}>
								{/* Number of items */}
								<FieldRow gridArea="numberOfItems">
									<Field name="numberOfItems">
										{({ input, meta }) => {
											const error = meta.error && meta.touched ? meta.error : null
											return (
												<Input
													{...input}
													type="number"
													min="0"
													step="1"
													placeholder="Number of items"
													error={error}
												/>
											)
										}}
									</Field>
								</FieldRow>

								{/* Random users */}
								<FieldRow gridArea="randomUsers">
									<Field name="randomUsers">
										{({ input, meta }) => (
											<>
												<FieldLabel>Random users </FieldLabel>
												<input {...input} type="checkbox" />
												<FormError
													message={meta.error}
													show={meta.error && meta.touched}
												/>
											</>
										)}
									</Field>
								</FieldRow>

								{/* Files (handled by separate component) */}
								<FieldRow gridArea="files">
									<FieldLabel>Zdjęcia</FieldLabel>
									<Field name="files" component={FileHandler} />
								</FieldRow>

								<LoaderButton
									text="Gotowe"
									type="submit"
									isLoading={submitting}
									disabled={submitting || pristine}
								/>
								{/* 
								{process.env.NODE_ENV === "development" && (
									<pre>{JSON.stringify(values, 0, 2)}</pre>
								)} */}
							</form>
						)
					}}
				/>
			</div>
		)
	}
}

export default withAuthentication(NewItemPage)
