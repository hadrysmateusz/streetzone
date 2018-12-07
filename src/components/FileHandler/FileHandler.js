import React, { Component } from "react"
import Button from "../Button"
import FileItem from "./FileItem"
import CustomFile from "./CustomFile"
import styles from "./FileHandler.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class FileHandler extends Component {
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
		await this.props.input.onChange(
			files.filter((fileItem) => fileItem.id !== id)
		)
	}

	clear = async () => {
		await this.props.input.onChange([])
	}

	render() {
		const { input, meta, isLoading, ...rest } = this.props

		const hasContent = Array.isArray(input.value) && input.value.length > 0

		const buttonText = hasContent ? "Dodaj pliki" : "Wybierz pliki"

		return (
			<div>
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
						text={buttonText}
					/>
					<Button
						type="button"
						onClick={this.clear}
						disabled={meta.submitting || isLoading}
					>
						Usuń wszystkie
					</Button>
				</div>

				<div className={styles.fileListContainer}>
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
						<div className={styles.emptyState}>
							Wybierz lub przeciągnij(TODO) pliki
						</div>
					)}
				</div>

				<div className={styles.mainErrorContainer}>
					{meta.error && (meta.dirty || meta.submitFailed) && meta.error.main && (
						<span>
							<FontAwesomeIcon icon="exclamation" />
							<span className={styles.mainErrorText}>{meta.error.main}</span>
						</span>
					)}
				</div>
			</div>
		)
	}
}

export default FileHandler
