import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import Button from "../Button"
import CustomFile from "./CustomFile"
import LoadingSpinner from "../LoadingSpinner"
import { CSS } from "../../constants"

const size = "160px"

const PreviewContainer = styled.div`
	width: ${size};
	height: ${size};
	position: relative;
	margin: 5px auto 20px;
`

const ButtonContainer = styled.div`
	margin: 8px 0;
	display: flex;
	justify-content: stretch;
	* {
		flex: 1 1 0;
	}
`

const PreviewOverlay = styled.div`
	opacity: 0;
	transition: opacity 0.15s linear;
	width: ${size};
	height: ${size};
	background: rgba(0, 0, 0, 0.38);
	border-radius: 50%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2.1rem;
	&:hover {
		opacity: 1;
	}
`

const OverlayButton = styled.div`
	padding: 13px;
	color: #eee;
	transition: all;
	&:hover {
		color: white;
		transform: scale(1.13);
	}
`

const Preview = styled.div`
	width: ${size};
	height: ${size};
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: ${(props) => `url(${props.url})`};
`

const EmptyPreview = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${size};
	height: ${size};
	border-radius: 50%;
	border: 2px dashed ${CSS.COLOR_BLACK};
	font-size: 1.45rem;
	color: ${CSS.COLOR_BLACK};
`

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
					<PreviewContainer>
						<PreviewOverlay>
							<OverlayButton title="Zmień" onClick={this.clickFileInput}>
								<FontAwesomeIcon icon="plus" />
							</OverlayButton>
							<OverlayButton title="Usuń" onClick={this.deleteFile}>
								<FontAwesomeIcon icon="trash" />
							</OverlayButton>
						</PreviewOverlay>
						<Preview url={input.value.previewUrl} />
					</PreviewContainer>
				) : (
					<PreviewContainer>
						{isLoading ? (
							<LoadingSpinner width="160px" height="160px" />
						) : (
							<>
								<PreviewOverlay onClick={this.clickFileInput}>
									<OverlayButton title="Dodaj">
										<FontAwesomeIcon icon="plus" />
									</OverlayButton>
								</PreviewOverlay>
								<EmptyPreview>Brak</EmptyPreview>
							</>
						)}
					</PreviewContainer>
				)}
				<input
					{...rest}
					type="file"
					accept="image/*"
					onChange={this.onChange}
					hidden
					ref={this.fileInput}
				/>
				<ButtonContainer>
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
				</ButtonContainer>
			</div>
		)
	}
}

export default FileHandlerSingle
