import React, { Component } from "react"
import styled from "styled-components"
import Dropzone from "react-dropzone"

import Button from "../Button"
import { FormError } from "../FormElements"

import FileItem from "./FileItem"
import CustomFile from "./CustomFile"

const FilesContainer = styled.div`
	position: relative;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr;

	min-height: 144px;

	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	user-select: none;
	outline: none;
	margin: 10px 0 0 0;
	padding: 10px;
	border: 1px solid #c6c6c6;
	background: white;
	.empty-state {
		position: absolute;
		color: ${(p) => p.theme.colors.gray[25]};
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 89;
		background: rgba(0, 0, 0, 0.32);
		color: white;
		text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
	}
`

class FileHandlerUnstyled extends Component {
	dropzone = React.createRef()

	clickDropzone = () => {
		this.dropzone.current.open()
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		// Get old files from final-form
		const oldFiles = this.props.input.value || []

		// Convert FileList into an array
		const newFiles = acceptedFiles

		// Reset the file input to prevent bugs
		this.dropzone.current.value = null

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
				<div className="buttonContainer">
					<Button
						type="button"
						onClick={this.clickDropzone}
						disabled={meta.submitting || isLoading}
					>
						{hasContent ? "Dodaj pliki" : "Wybierz pliki"}
					</Button>
					<Button
						type="button"
						onClick={this.clear}
						disabled={
							meta.submitting || isLoading || !input.value || input.value.length === 0
						}
					>
						Usuń wszystkie
					</Button>
				</div>
				<Dropzone
					onDrop={this.onDrop}
					accept={"image/jpeg,image/png"}
					disableClick={hasContent}
					ref={this.dropzone}
				>
					{({ getRootProps, getInputProps, isDragActive }) => {
						return (
							<FilesContainer {...getRootProps()}>
								<input {...getInputProps()} />
								{isDragActive && (
									<div className="empty-state overlay">Upuść pliki tutaj aby dodać</div>
								)}

								{hasContent
									? input.value.map((file, i) => {
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
									: !isDragActive && (
											<div className="empty-state">Wybierz lub przeciągnij pliki</div>
									  )}
							</FilesContainer>
						)
					}}
				</Dropzone>

				<FormError
					message={meta.error ? meta.error.main : ""}
					show={meta.error && (meta.dirty || meta.submitFailed) && meta.error.main}
				/>
			</div>
		)
	}
}

const FileHandler = styled(FileHandlerUnstyled)`
	.buttonContainer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
	}
`

export default FileHandler
