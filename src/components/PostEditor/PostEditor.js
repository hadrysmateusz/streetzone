import React, { useCallback, useState } from "react"
import styled from "styled-components/macro"
import { useDropzone } from "react-dropzone"

import { Textarea } from "../FormElements"
import { Button, ButtonContainer, IconButton } from "../Button"
import { Overlay } from "../FileHandler/common"

import { useFlash } from "../../hooks"

import { AttachmentsManager, PostPreview } from "."

export const OuterContainer = styled.div``

const FileHandlerContainer = styled.div`
	position: relative;
`

const ViewSwitchButton = ({ isEditing, setIsEditing }) => {
	const icon = isEditing ? "eye" : "edit"
	const togglePreview = () => setIsEditing((state) => !state)
	return <IconButton icon={icon} onClick={togglePreview} />
}

const HelpButton = () => (
	<a
		href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
		target="_blank"
		rel="noopener noreferrer"
	>
		<IconButton icon="question" />
	</a>
)

const PostEditor = (props) => {
	const [isEditing, setIsEditing] = useState(true)
	const flashMessage = useFlash()

	let {
		value,
		attachmentsValue,
		onAttachmentsChange,
		onFocus,
		onBlur,
		onChange,
		error,
		info,
		disabled
	} = props

	const onDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
			const file = acceptedFiles[0]

			if (file) {
				const reader = new FileReader()
				reader.addEventListener("loadend", () => {
					// Update the state container
					onChange(reader.result)
				})

				reader.readAsText(file)
			}

			// Reset the file input to prevent bugs
			inputRef.current.value = null
		},
		[value]
	)

	const onDropRejected = (...args) => {
		flashMessage({ type: "error", text: "Błąd", details: "Nieprawidłowy plik" })
	}

	const { getRootProps, getInputProps, isDragActive, inputRef, open } = useDropzone({
		onDrop,
		onDropRejected,
		accept: "text/*,.md",
		noClick: true,
		multiple: false
	})

	const isEmpty = !value || value.length === 0
	const openFilePicker = open

	return (
		<div>
			<ButtonContainer>
				<Button onClick={openFilePicker} fullWidth>
					Wybierz plik
				</Button>
				<AttachmentsManager value={attachmentsValue} onChange={onAttachmentsChange} />
				<ViewSwitchButton isEditing={isEditing} setIsEditing={setIsEditing} />
				<HelpButton />
			</ButtonContainer>
			<OuterContainer>
				{isEditing ? (
					<FileHandlerContainer {...getRootProps({ hasError: !!error, isEmpty })}>
						<input {...getInputProps()} />

						<Textarea
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							onFocus={onFocus}
							placeholder="Wybierz lub przeciągnij plik (tekstowy lub Markdown), bądź zacznij pisać"
							disabled={disabled}
							info={info}
							error={error}
						/>

						{isDragActive && <Overlay alwaysShow>Upuść tutaj aby dodać</Overlay>}
					</FileHandlerContainer>
				) : (
					<PostPreview attachments={attachmentsValue} markdownSource={value} />
				)}
			</OuterContainer>
		</div>
	)
}

export default PostEditor
