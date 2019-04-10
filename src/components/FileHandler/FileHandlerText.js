import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"

import { FormElementContainer, commonStyles, Textarea } from "../FormElements"

import { Overlay } from "./common"
import { Button, ButtonContainer } from "../Button"

const FileHandlerContainer = styled.div`
	position: relative;
`

const FileHandlerText = ({
	info,
	error,
	disabled,
	value,
	onChange,
	containerStyles,
	...rest
}) => {
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
			rootRef.current.value = null
		},
		[value]
	)

	const onDropRejected = (...args) => {
		debugger
	}

	const isEmpty = !value || value.length === 0

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		onDropRejected,
		accept: "text/*,.md",
		noClick: true,
		multiple: false
	})

	const clickDropzone = () => {
		open()
	}

	return (
		<FormElementContainer error={error} info={info} {...rest}>
			<ButtonContainer>
				<Button type="button" onClick={clickDropzone} fullWidth>
					{!isEmpty ? "Dodaj plik" : "Wybierz plik"}
				</Button>
			</ButtonContainer>
			<FileHandlerContainer
				{...getRootProps({ hasError: !!error, isEmpty, containerStyles })}
			>
				<input {...getInputProps()} />

				<Textarea
					info={info}
					error={error}
					disabled={disabled}
					value={value}
					onChange={onChange}
					placeholder="Wybierz lub przeciągnij plik"
				/>

				{isDragActive && <Overlay alwaysShow>Upuść tutaj aby dodać</Overlay>}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

export default FileHandlerText
