import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"

import { FormElementContainer, commonStyles } from "../../FormElements"
import { CustomFile } from ".."
import { ButtonContainer, Button } from "../../Button"
import FileItem from "./FileItem"
import { overlayCommon } from "../../../style-utils"
import { Overlay } from "./common"

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

const EmptyState = styled.div`
	${overlayCommon}
	${commonStyles.placeholderStyles}
`

const FileHandler = ({
	info,
	error,
	itemErrors,
	disabled,
	value = [],
	onChange,
	...rest
}) => {
	const onDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
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

	const onDropRejected = (...args) => {
		debugger
	}

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

	const onSetMain = (id) => {
		// Find
		const newValue = value.map((fileItem) => {
			if (fileItem.id === id) {
				fileItem.isMain = true
			} else {
				fileItem.isMain = false
			}
			return fileItem
		})

		// Update the state container
		onChange(newValue)
	}

	const onClear = () => {
		// Set state to an empty array
		onChange([])
	}

	const isEmpty = !value || value.length === 0
	const hasMain = value.find((fileItem) => fileItem.isMain)

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		onDropRejected,
		accept: "image/jpeg,image/png",
		noClick: !isEmpty
	})

	const clickDropzone = () => {
		open()
	}

	return (
		<FormElementContainer error={error} info={info} {...rest}>
			<ButtonContainer>
				<Button type="button" onClick={clickDropzone}>
					{!isEmpty ? "Dodaj pliki" : "Wybierz pliki"}
				</Button>
				<Button type="button" onClick={onClear} disabled={isEmpty}>
					Usuń wszystkie
				</Button>
			</ButtonContainer>
			<FileHandlerContainer {...getRootProps({ hasError: !!error, isEmpty })}>
				<input {...getInputProps()} />

				{isDragActive && <Overlay alwaysShow>Upuść pliki tutaj aby dodać</Overlay>}

				{isEmpty
					? !isDragActive && <EmptyState>Wybierz lub przeciągnij pliki</EmptyState>
					: value.map((file, i) => {
							// if no item has isMain, default to the first item
							const isMain = hasMain ? file.isMain : i === 0
							// check if item has an error
							const error = itemErrors ? itemErrors[file.id] : null

							return (
								<FileItem
									key={file.id}
									onDelete={onDelete}
									onSetMain={onSetMain}
									id={file.id}
									previewUrl={file.previewUrl}
									isMain={isMain}
									error={error}
								/>
							)
					  })}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

FileHandler.propTypes = {
	info: PropTypes.string,
	error: PropTypes.string,
	itemErrors: PropTypes.array,
	disabled: PropTypes.bool,
	value: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired
}

FileHandler.defaultProps = {
	value: [],
	itemErrors: []
}

export default FileHandler
