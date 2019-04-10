import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"

import { FormElementContainer, commonStyles } from "../FormElements"
import { TextBlock } from "../StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconContainer, Overlay } from "./common"
import { Button, ButtonContainer } from "../Button"
import { overlayCommon } from "../../style-utils"

const FileHandlerContainer = styled.div`
	${commonStyles.basicStyles}
	height: 150px;

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

	position: relative;
`

const EmptyState = styled.div`
	${overlayCommon}
	${commonStyles.placeholderStyles}
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

	const onClear = () => {
		onChange(null)
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
				<Button type="button" onClick={clickDropzone}>
					{!isEmpty ? "Dodaj plik" : "Wybierz plik"}
				</Button>
			</ButtonContainer>
			<FileHandlerContainer
				{...getRootProps({ hasError: !!error, isEmpty, containerStyles })}
			>
				<input {...getInputProps()} />

				{isDragActive && <Overlay alwaysShow>Upuść tutaj aby dodać</Overlay>}

				{!isDragActive && <EmptyState>Wybierz lub przeciągnij plik</EmptyState>}
			</FileHandlerContainer>
		</FormElementContainer>
	)
}

export default FileHandlerText
