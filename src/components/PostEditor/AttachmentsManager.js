import React, { useEffect, useRef } from "react"

import { CustomFile } from "../FileHandler"
import { IconButton } from "../Button"

import { useCopyToClipboard } from "../../hooks"

const AttachmentsManager = ({ value, onChange }) => {
	const inputRef = useRef()
	const copyToClipboard = useCopyToClipboard()

	// make sure the value is always an array to prevent errors
	if (!value) value = []

	const onFileChange = () => {
		const file = inputRef.current.files[0]

		// create CustomFile with preview
		let previewUrl = window.URL.createObjectURL(file)
		let newFile = new CustomFile({ previewUrl, data: file })

		// Reset the file input to prevent bugs
		inputRef.current.value = null

		console.log(newFile)

		copyToClipboard(`![${file.name}](ID[${newFile.id}])`, "Wklej by dodać to zdjęcie")

		// Merge old files and new files
		const newValue = [...value, newFile]

		// Update the state container
		onChange(newValue)
	}

	useEffect(
		() => () => {
			// Revoke the data urls to avoid memory leaks
			value.forEach((file) => URL.revokeObjectURL(file.previewUrl))
		},
		[value]
	)

	const openFilePicker = () => inputRef.current.click()

	return (
		<label>
			<IconButton icon="image" onClick={openFilePicker} />
			<input type="file" onChange={onFileChange} ref={inputRef} hidden />
		</label>
	)
}

export default AttachmentsManager
