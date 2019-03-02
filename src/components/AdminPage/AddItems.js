import React, { Component } from "react"
import shortid from "shortid"

import { withAuthentication } from "../UserSession"
import { Form, Field } from "react-final-form"
import styled from "styled-components"

import { LoaderButton } from "../Button"
import { FieldRow, FieldLabel, StyledInput } from "../Basics"
import { FormError } from "../FormElements"
import { FileHandler } from "../FileHandler"

import { ITEM_SCHEMA } from "../../constants"

class NewItemPage extends Component {
	state = { isLoading: false }

	uploadItem = async (values, userId) => {
		try {
			const { firebase } = this.props
			const files = values.files

			// Look for the document with correct id
			const userSnap = await this.user(userId).get()
			// If the user isn't found throw an error
			if (!userSnap.exists) throw new Error("Nie znaleziono użytkownika")
			// Get user data
			const oldItems = userSnap.data()

			// Upload files to storage and get their refs
			const attachments = await Promise.all(
				files.map(async (file) => {
					const snapshot = await firebase.uploadFile("attachments", file.data)
					return snapshot.ref.fullPath
				})
			)

			const designers = (await firebase.db.collection("designers").get()).docs.map(
				(doc) => doc.data()
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
				modifiedAt: null,
				itemId,
				userId,
				attachments
			}

			// Add item to database
			await firebase.item(itemId).set(data)

			// Add the new item's id to user's items
			const items = [...oldItems, itemId]
			await firebase.user(userId).update({ items })

			return
		} catch (error) {
			alert("Wystąpił problem podczas wystawiania przedmiotu")
			console.log(error)
		}
	}

	onSubmit = async (values) => {
		for (let i = 0; i < values.numberOfItems; i++) {
			await this.uploadItem(values, this.props.authUser.uid)
		}
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
										{({ input, meta }) => (
											<>
												<FieldLabel>Number of items </FieldLabel>
												<StyledInput
													{...input}
													type="number"
													min="0"
													step="1"
													placeholder="n of items"
												/>
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

								{/* {process.env.NODE_ENV === "development" && (
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
