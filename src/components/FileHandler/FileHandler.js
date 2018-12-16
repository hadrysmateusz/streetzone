import React, { Component } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Button from "../Button"
import FileItem from "./FileItem"
import CustomFile from "./CustomFile"
import { CSS } from "../../constants"

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

		const buttonText = hasContent ? "Dodaj pliki" : "Wybierz pliki"

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
						{buttonText}
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
							Wybierz lub przeciągnij(TODO) pliki
						</div>
					)}
				</div>

				<div className="main-error-container">
					{meta.error && (meta.dirty || meta.submitFailed) && meta.error.main && (
						<span>
							<FontAwesomeIcon icon="exclamation" />
							<span className="main-error-text">{meta.error.main}</span>
						</span>
					)}
				</div>
			</div>
		)
	}
}

const FileHandler = styled(FileHandlerUnstyled)`
	.file-list-container {
		display: flex;
		justify-items: left;
		justify-content: left;
		flex-wrap: wrap;
		margin: 10px 0 0 0;
		padding: 10px 10px 0 10px;
		min-height: 150px;
		border: 2px dashed ${CSS.COLOR_BLACK};

		.empty-state {
			width: 100%;
			height: auto;
			margin-bottom: 10px;
			font-size: 1.1rem;
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
