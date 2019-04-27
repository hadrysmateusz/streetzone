import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"

import { FormElementContainer, commonStyles } from "../FormElements"
import { CustomFile } from "."
import { ButtonContainer, Button } from "../Button"
import SmartFileItem from "./SmartFileItem"
import { overlayCommon } from "../../style-utils"
import { Overlay } from "./common"
import useFirebase from "../../hooks/useFirebase"

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

const LiveFileHandler = ({
	info,
	error,
	itemErrors,
	disabled,
	value,
	onChange,
	...rest
}) => {
	const [items, setItems] = useState([])
	const firebase = useFirebase()

	const _onChange = (newValue) => {
		// Update internal state
		setItems(newValue)

		// Get only the storageRefs
		const storageRefs = newValue.map((val) => val.storageRef)

		// Update external state
		onChange(storageRefs)
	}

	const onDrop = (acceptedFiles, rejectedFiles) => {
		// Map Files to CustomFiles
		const newItems = [...acceptedFiles].map((data) => {
			let customFile = new CustomFile({ data })
			return customFile
		})

		// Reset the file input to prevent bugs
		rootRef.current.value = null

		// Merge old files and new files
		const __items = [...items, ...newItems]

		_onChange(__items)
	}

	const onGetStorageRef = (id, storageRef) => {
		// Find
		const __items = items.map((fileItem) => {
			if (fileItem.id === id) {
				fileItem.isUploaded = true
				fileItem.storageRef = storageRef
			}

			return fileItem
		})

		_onChange(__items)
	}

	const onDropRejected = (...args) => {
		debugger
	}

	const onDelete = (id) => {
		const __items = []

		items.forEach((item) => {
			if (item.id === id) {
				const storageRef = item.storageRef
				firebase.removeFile(storageRef)
			} else {
				__items.push(item)
			}
		})

		_onChange(__items)
	}

	const onSetMain = (id) => {
		// Find
		const __items = items.map((fileItem) => {
			if (fileItem.id === id) {
				fileItem.isMain = true
			} else {
				fileItem.isMain = false
			}
			return fileItem
		})

		_onChange(__items)
	}

	const onClear = () => {
		items.forEach((item) => onDelete(item.id))

		_onChange([])
	}

	const isEmpty = !items || items.length === 0
	const hasMain = items.find((fileItem) => fileItem.isMain)

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
					: items.map((file, i) => {
							// if no item has isMain, default to the first item
							const isMain = hasMain ? file.isMain : i === 0
							// check if item has an error
							const error = itemErrors ? itemErrors[file.id] : null

							return (
								<SmartFileItem
									key={file.id}
									onDelete={onDelete}
									onSetMain={onSetMain}
									onGetStorageRef={onGetStorageRef}
									isMain={isMain}
									id={file.id}
									data={file.data}
									storageRef={file.storageRef}
									error={error}
								/>
							)
					  })}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

export default LiveFileHandler
