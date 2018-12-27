import React, { Component } from "react"
import styled from "styled-components"

import Button from "../Button"
import FileItem from "./FileItem"
import CustomFile from "./CustomFile"
import { Error } from "../ItemForm"

class FileHandlerUnstyled extends Component {
	fileInput = React.createRef()

	clickFileInput = () => {
		this.fileInput.current.click()
	}

	onChange = async (event) => {
		// Get old files from final-form
		const oldFiles = this.props.input.value || []

		// Convert FileList into an array
		const newFiles = [...event.target.files]

		// Reset the file input to prevent bugs
		event.target.value = null

		// Map files to custom files with previews
		const files = oldFiles.concat(
			newFiles.map((newFile) => {
				let previewUrl = window.URL.createObjectURL(newFile)
				return new CustomFile({ previewUrl, data: newFile })
			})
		)

		// Update value in final-form
		this.props.input.onChange(files)
	}

	deleteFileItem = async (id) => {
		// Get files from final-form
		const files = this.props.input.value

		// Update value in final-form
		await this.props.input.onChange(files.filter((fileItem) => fileItem.id !== id))
	}

	clear = async () => {
		await this.props.input.onChange([])
	}

	render() {
		const { input, meta, isLoading, ...rest } = this.props
		const hasContent = Array.isArray(input.value) && input.value.length > 0

		return (
			<div {...rest}>
				<div>
					<input
						{...rest}
						type="file"
						accept="image/*"
						onChange={this.onChange}
						style={{ display: "none" }}
						ref={this.fileInput}
						multiple
					/>
					<Button
						type="button"
						onClick={this.clickFileInput}
						disabled={meta.submitting || isLoading}
					>
						{hasContent ? "Dodaj pliki" : "Wybierz pliki"}
					</Button>
					<Button
						type="button"
						onClick={this.clear}
						disabled={meta.submitting || isLoading}
					>
						Usuń wszystkie
					</Button>
				</div>

				<div className="file-list-container">
					{hasContent ? (
						input.value.map((file, i) => {
							const error = meta.error && meta.error.specific[i]
							return (
								<FileItem
									key={i}
									onDelete={this.deleteFileItem}
									fileItem={file}
									error={error}
								/>
							)
						})
					) : (
						<div className="empty-state" onClick={this.clickFileInput}>
							Wybierz lub przeciągnij pliki
						</div>
					)}
				</div>

				<Error
					message={meta.error.main}
					showIf={meta.error && (meta.dirty || meta.submitFailed) && meta.error.main}
				/>
			</div>
		)
	}
}

const FileHandler = styled(FileHandlerUnstyled)`
	.file-list-container {
		position: relative;
		display: grid;
		grid-gap: 10px;
		grid-template-columns: 1fr 1fr 1fr;

		margin: 10px 0 0 0;
		padding: 10px;
		min-height: 201px;
		border: 1px solid #c6c6c6;
		background: white;
		.empty-state {
			position: absolute;
			color: #7f7f7f;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			/* font-size: 1.1rem; */
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.main-error-container {
		&:not(:empty) {
			background: rgb(243, 148, 148);
			border: 2px solid rgb(133, 5, 5);
			padding: 12px 18px;
			margin-top: 10px;
		}
		color: rgb(112, 11, 11);
	}

	.main-error-text {
		margin-left: 7px;
	}
`

export default FileHandler
