import React, { Component, useState, useEffect } from "react"
import shortid from "shortid"
import { OnChange } from "react-final-form-listeners"
import Datetime from "react-datetime"

import LoadingSpinner from "../../components/LoadingSpinner"
import styled from "styled-components"

import Button, { LoaderButton, ButtonContainer } from "../../components/Button"
import { Input } from "../../components/FormElements"
import { TextBlock, Text } from "../../components/StyledComponents"
import { FileHandlerSingle } from "../../components/FileHandler"
import { Form, Field } from "react-final-form"
import useFirebase from "../../hooks/useFirebase"
import { FORM_ERR } from "../../constants"
import useFirestoreCollection from "../../hooks/useFirestoreCollection"
import DropdownFinalform from "../../components/DropdownFinalform"
import { Textarea } from "../../components/FormElements"

import "react-datetime/css/react-datetime.css"

const sectionOptions = [
	{
		value: "Wiedza",
		label: "Wiedza"
	},
	{
		value: "Dropy",
		label: "Dropy"
	},
	{
		value: "Artykuły",
		label: "Artykuły"
	}
]

const BlogImageContainer = styled.div`
	img {
		max-height: 100px;
		max-width: 300px;
	}
`

const BlogPostContainer = styled.div`
	border: 1px solid black;
	padding: 16px;
	margin: 10px 0;
`

const BlogPost = ({ post }) => {
	const firebase = useFirebase()

	const { id, mainImageURL, mainImageRef, title, author } = post

	const onDelete = (id) => {
		try {
			const shouldDelete = window.confirm(`Do you really want to delete "${title}"?`)
			if (shouldDelete) {
				firebase.post(id).delete()
			}
		} catch (error) {
			console.log(error)
			alert(error)
		}
	}

	return (
		<BlogPostContainer>
			<TextBlock bold size="m">
				{title}
			</TextBlock>
			<TextBlock bold color="#444">
				{author}
			</TextBlock>
			<BlogImageContainer>
				<img src={mainImageURL} />
			</BlogImageContainer>
			<Button onClick={() => onDelete(id)}>Delete</Button>
		</BlogPostContainer>
	)
}

const AddPost = () => {
	const firebase = useFirebase()

	const onSubmit = async (
		{ section, mainImage, title, author, mainContent, dropDate },
		actions
	) => {
		try {
			const id = shortid.generate()
			const imageId = shortid.generate()

			const mainImageSnap = await firebase.uploadFile(
				`blog-photos/${imageId}`,
				mainImage.data
			)
			const mainImageRef = mainImageSnap.ref.fullPath
			const mainImageURL = await firebase.getImageURL(mainImageRef)

			let data = {
				id,
				section,
				title: title.trim(),
				mainContent,
				mainImageRef,
				mainImageURL,
				createdAt: Date.now(),
				editedAt: null,
				comments: []
			}

			if (author) {
				data.author = author
			}

			if (dropDate) {
				data.dropDate = dropDate.valueOf()
				debugger
			}

			await firebase.post(id).set(data)

			// Reset form
			actions.reset()
		} catch (error) {
			alert("Wystąpił problem")
			console.log(error)
		}
	}

	const validate = ({ author, title, section, mainContent, mainImage, dropDate }) => {
		const errors = {}

		if (!title) {
			errors.title = FORM_ERR.IS_REQUIRED
		}

		if (!section) {
			errors.section = FORM_ERR.IS_REQUIRED
		} else {
			if (section !== "drops" && !author) {
				errors.author = FORM_ERR.IS_REQUIRED
			}
		}

		if (!mainContent) {
			errors.mainContent = FORM_ERR.IS_REQUIRED
		}

		if (!mainImage) {
			errors.mainImage = FORM_ERR.IS_REQUIRED
		}

		console.log(errors)
		return errors
	}

	return (
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({ handleSubmit, submitting, pristine, form, values }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Field name="section" type="select">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<DropdownFinalform
										{...input}
										options={sectionOptions}
										placeholder="Section"
										error={error}
									/>
								)
							}}
						</Field>
						{values.section !== "drops" && (
							<Field name="author">
								{({ input, meta }) => {
									const error = meta.error && meta.touched ? meta.error : null
									return (
										<Input
											{...input}
											type="text"
											placeholder="Author"
											error={error}
											info="autor jest zbędny dla dropów"
										/>
									)
								}}
							</Field>
						)}

						<Field name="title">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return <Input {...input} type="text" placeholder="Title" error={error} />
							}}
						</Field>

						<Field name="mainContent">
							{({ input, meta }) => {
								const error = meta.error && meta.touched ? meta.error : null
								return (
									<Textarea {...input} placeholder="Main text content" error={error} />
								)
							}}
						</Field>

						{values.section === "drops" && (
							<>
								<Text size="m" bold>
									Data dropu
								</Text>
								<Field name="dropDate">
									{({ input, meta }) => {
										const error = meta.error && meta.touched ? meta.error : null
										return (
											<Datetime
												{...input}
												error={error}
												input={false}
												timeFormat="HH:mm"
											/>
										)
									}}
								</Field>
							</>
						)}

						<Field name="mainImage" component={FileHandlerSingle} />

						<ButtonContainer centered>
							<LoaderButton
								text="Gotowe"
								type="submit"
								isLoading={submitting}
								disabled={submitting || pristine}
								primary
							/>
						</ButtonContainer>
						{/* {process.env.NODE_ENV === "development" && (
							<pre>{JSON.stringify(values, 0, 2)}</pre>
						)} */}
					</form>
				)
			}}
		/>
	)
}

const BlogManagement = () => {
	const posts = useFirestoreCollection("posts")

	return !posts ? (
		<LoadingSpinner fixedHeight />
	) : (
		<div>
			<TextBlock size="xl" bold>
				Blog
			</TextBlock>
			{posts.length > 0 && (
				<div>
					{posts.map((post) => (
						<BlogPost post={post} />
					))}
				</div>
			)}
			<h4>Add</h4>
			<AddPost />
		</div>
	)
}

export default BlogManagement
