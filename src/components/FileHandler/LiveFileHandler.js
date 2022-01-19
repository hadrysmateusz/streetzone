import React, { useState } from "react"
import { useDropzone } from "react-dropzone"

import { FormElementContainer } from "../FormElements"
import { CustomFile } from "."
import { ButtonContainer, Button } from "../Button"
import SmartFileItem from "./SmartFileItem"
import { Overlay } from "./common"
import useFirebase from "../../hooks/useFirebase"
import { FileHandlerContainer, EmptyState } from "./FileHandlerStyles"

const LiveFileHandler = ({
	info,
	error,
	itemErrors,
	disabled,
	value,
	onChange,
	uploadPath,
	...rest
}) => {
	const [items, setItems] = useState([])
	const firebase = useFirebase()

	const _onChange = (newValue) => {
		// Update internal state
		setItems(newValue)

		// Get only the requiredValues
		const formattedAttachments = newValue.map((val) => ({
			ref: val.storageRef,
			url: val.previewUrl,
			isMain: val.isMain
		}))

		// Update external state
		onChange(formattedAttachments)
	}

	const onDrop = (acceptedFiles, rejectedFiles) => {
		// Map Files to CustomFiles
		const newItems = [...acceptedFiles].map((data) => {
			let customFile = new CustomFile({ data })
			return customFile
		})

		// Reset the file input to prevent bugs
		inputRef.current.value = null

		// Merge old files and new files
		const __items = [...items, ...newItems]

		_onChange(__items)
	}

	const onUpload = (id, storageRef, previewUrl) => {
		// Find
		const __items = items.map((fileItem) => {
			if (fileItem.id === id) {
				fileItem.isUploaded = true
				fileItem.storageRef = storageRef
				fileItem.previewUrl = previewUrl
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
				// if item matches id, delete its images and DON'T add it to new array
				const storageRef = item.storageRef
				firebase.removeAllImagesOfRef(storageRef)
			} else {
				// all other images should be added to new array
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

	const { getRootProps, getInputProps, isDragActive, inputRef, open } = useDropzone({
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
				<Button type="button" onClick={onClear} disabled={isEmpty} danger>
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
									onUpload={onUpload}
									isMain={isMain}
									id={file.id}
									data={file.data}
									storageRef={file.storageRef}
									previewUrl={file.previewUrl}
									error={error}
									uploadPath={uploadPath}
								/>
							)
					  })}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

export default LiveFileHandler
