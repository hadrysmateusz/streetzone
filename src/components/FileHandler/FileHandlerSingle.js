import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import cn from "classnames"

import Button from "../Button"
import CustomFile from "./CustomFile"
import LoadingSpinner from "../LoadingSpinner"

import styles from "./FileHandlerSingle.module.scss"

class FileHandlerSingle extends Component {
	fileInput = React.createRef()

	clickFileInput = () => {
		this.fileInput.current.click()
	}

	onChange = async (event) => {
		// Get the only file
		const newFile = event.target.files[0]

		// Reset the file input to prevent bugs
		event.target.value = null

		// Create CustomFile Object with previewURL
		let previewUrl = window.URL.createObjectURL(newFile)
		const file = new CustomFile({ previewUrl, data: newFile })

		// Update value in final-form
		this.props.input.onChange(file)
	}

	deleteFile = async () => {
		// Update value in final-form
		this.props.input.onChange(undefined)
	}

	reset = async () => {
		// Reset value in final-form to initial-value
		this.props.input.onChange(this.props.meta.initial)
	}

	render() {
		const { input, meta, isLoading, ...rest } = this.props

		const hasContent = input.value

		return (
			<div>
				{hasContent ? (
					<div className={styles.avatarPreviewContainer}>
						<div className={styles.avatarPreviewOverlay}>
							<div
								className={cn(styles.icon, styles.iconChange)}
								title="Zmień"
								onClick={this.clickFileInput}
							>
								<FontAwesomeIcon icon="plus" />
							</div>
							<div
								className={cn(styles.icon, styles.iconDelete)}
								title="Usuń"
								onClick={this.deleteFile}
							>
								<FontAwesomeIcon icon="trash" />
							</div>
						</div>
						<div
							className={styles.avatarPreview}
							style={{ backgroundImage: `url(${input.value.previewUrl})` }}
						/>
					</div>
				) : (
					<div className={styles.avatarPreviewContainer}>
						{isLoading ? (
							<LoadingSpinner width="160px" height="160px" />
						) : (
							<>
								<div
									className={styles.avatarPreviewOverlay}
									onClick={this.clickFileInput}
								>
									<div className={cn(styles.icon, styles.iconChange)} title="Dodaj">
										<FontAwesomeIcon icon="plus" />
									</div>
								</div>
								<div className={styles.emptyPreview}>Brak</div>
							</>
						)}
					</div>
				)}
				<div className={styles.buttons}>
					<input
						{...rest}
						type="file"
						accept="image/*"
						onChange={this.onChange}
						style={{ display: "none" }}
						ref={this.fileInput}
					/>
					<Button
						type="button"
						onClick={this.clickFileInput}
						disabled={meta.submitting || isLoading}
					>
						Wybierz plik
					</Button>
					<Button
						type="button"
						disabled={meta.submitting || meta.pristine || isLoading}
						onClick={this.reset}
					>
						Anuluj
					</Button>
				</div>
				{/* <div className={styles.fileListContainer}>
					{hasContent &&
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
						})}
				</div> */}
			</div>
		)
	}
}

export default FileHandlerSingle
