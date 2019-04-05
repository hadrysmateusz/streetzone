import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"

import { FormElementContainer, commonStyles } from "../../FormElements"
import { CustomFile } from ".."
import { ButtonContainer, Button } from "../../Button"
import FileItem from "./FileItem"
import { overlayCommon } from "../../../style-utils"

const FileHandlerContainer = styled.div`
	${commonStyles.basicStyles}
	min-height: 150px;

	&[disabled] {
		${commonStyles.disabledStyles}
	}

	&:not([disabled]) {
		:hover {
			/* only apply hover styles if the container is empty */
			${(p) => p.isEmpty && commonStyles.hoverStyles}
		}
		:focus {
			${commonStyles.focusStyles}
		}
	}

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: var(--spacing3);
	padding: var(--spacing3);
	position: relative;
`

const DragOverlay = styled.div`
	${overlayCommon}
	background: rgba(0, 0, 0, 0.32);
	text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
	color: white;
	z-index: 89;
`

const EmptyState = styled.div`
	${overlayCommon}
	${commonStyles.placeholderStyles}
`

const FileHandler = ({ info, error, disabled, input: { value, onChange }, ...rest }) => {
	const onDrop = useCallback(
		(acceptedFiles) => {
			// Map Files to CustomFiles with previews
			const newFiles = [...acceptedFiles].map((data) => {
				let previewUrl = window.URL.createObjectURL(data)
				let customFile = new CustomFile({ previewUrl, data })
				return customFile
			})

			// Reset the file input to prevent bugs
			rootRef.current.value = null

			// Merge old files and new files
			const newValue = [...value, ...newFiles]

			// Update the state container
			onChange(newValue)
		},
		[value]
	)

	useEffect(
		() => () => {
			// Revoke the data urls to avoid memory leaks
			value.forEach((file) => URL.revokeObjectURL(file.previewUrl))
		},
		[value]
	)

	const onDelete = (id) => {
		// Filter out the file with given id
		const newValue = value.filter((fileItem) => fileItem.id !== id)

		// Update the state container
		onChange(newValue)
	}

	const onClear = () => {
		// Set state to an empty array
		onChange([])
	}

	const isEmpty = !value || value.length === 0

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		accept: "image/jpeg,image/png",
		noClick: !isEmpty
	})

	const clickDropzone = () => {
		// rootRef.current.click()
		open()
	}

	return (
		<FormElementContainer error={error} info={info}>
			<ButtonContainer>
				<Button onClick={clickDropzone}>
					{!isEmpty ? "Dodaj pliki" : "Wybierz pliki"}
				</Button>
				<Button onClick={onClear} disabled={isEmpty}>
					Usuń wszystkie
				</Button>
			</ButtonContainer>
			<FileHandlerContainer {...getRootProps({ hasError: !!error, isEmpty })}>
				<input {...getInputProps()} />

				{isDragActive && <DragOverlay>Upuść pliki tutaj aby dodać</DragOverlay>}

				{!isEmpty
					? value.map((file) => {
							return (
								<FileItem
									key={file.id}
									onDelete={onDelete}
									id={file.id}
									previewUrl={file.previewUrl}
								/>
							)
					  })
					: !isDragActive && <EmptyState>Wybierz lub przeciągnij pliki</EmptyState>}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

FileHandler.propTypes = {
	info: PropTypes.string,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
}

FileHandler.defaultProps = {
	value: []
}

export default FileHandler
