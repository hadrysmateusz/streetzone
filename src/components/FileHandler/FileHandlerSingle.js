import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import CustomFile from "./CustomFile"
import LoadingSpinner from "../LoadingSpinner"

const size = "160px"

const PreviewContainer = styled.div`
	width: ${size};
	height: ${size};
	position: relative;
	margin: 5px auto 20px;
`

const PreviewOverlay = styled.div`
	width: ${size};
	height: ${size};
	background: rgba(0, 0, 0, 0.32);
	border-radius: 50%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`

const OverlayButton = styled.div`
	padding: 13px;
	color: #eee;
	transition: all;
	&:hover {
		color: white;
		transform: scale(1.13);
	}
	::after {
		content: "${(p) => p.text}";
		display: block;
		text-align: center;
		padding-top: 4px;
		text-shadow: 1px 1px solid black;
	}
`

const Preview = styled.div`
	width: ${size};
	height: ${size};
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	background-image: ${(props) => `url(${props.url})`};
`

const EmptyPreview = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${size};
	height: ${size};
	border-radius: 50%;
	border: 2px dashed ${(p) => p.theme.colors[50]};
	color: ${(p) => p.theme.colors[50]};
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

		const hasContent = !!input.value

		return (
			<div>
				{hasContent ? (
					<PreviewContainer>
						<PreviewOverlay>
							<OverlayButton text="Zmień" onClick={this.clickFileInput}>
								<FontAwesomeIcon icon="plus" />
							</OverlayButton>
							<OverlayButton text="Usuń" onClick={this.deleteFile}>
								<FontAwesomeIcon icon="trash" />
							</OverlayButton>
						</PreviewOverlay>
						<Preview url={input.value.previewUrl} />
					</PreviewContainer>
				) : (
					<PreviewContainer>
						{isLoading ? (
							<LoadingSpinner width={size} height={size} />
						) : (
							<>
								<PreviewOverlay onClick={this.clickFileInput}>
									<OverlayButton text="Dodaj">
										<FontAwesomeIcon icon="plus" />
									</OverlayButton>
								</PreviewOverlay>
								<EmptyPreview />
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
			</div>
		)
	}
}

export default FileHandlerSingle
