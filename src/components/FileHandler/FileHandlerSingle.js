import React, { useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { useDropzone } from "react-dropzone"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { CustomFile } from "."
import { IconContainer, Overlay } from "./common"
import { FormElementContainer, commonStyles } from "../FormElements"
import { TextBlock } from "../StyledComponents"

const FileHandlerSingleContainer = styled.div`
	${commonStyles.basicStyles}
	min-height: 150px;

	&[disabled] {
		${commonStyles.disabledStyles}
	}

	&:not([disabled]) {
		:hover {
			${commonStyles.hoverStyles}
		}
		:focus {
			${commonStyles.focusStyles}
		}
	}

	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	position: relative;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	${(p) => p.containerStyles}
`

const FileHandlerSingle = ({
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
			// Create CustomFile with preview
			const file = acceptedFiles[0]
			let previewUrl = window.URL.createObjectURL(file)
			let customFile = new CustomFile({ previewUrl, data: file })

			// Reset the file input to prevent bugs
			rootRef.current.value = null

			// Update the state container
			onChange(customFile)
		},
		[value]
	)

	const onDropRejected = (...args) => {
		debugger
	}

	useEffect(
		() => () => {
			// Revoke the data url to avoid memory leaks
			URL.revokeObjectURL(value.previewUrl)
		},
		[value]
	)

	const onClear = () => {
		onChange(null)
	}

	const isEmpty = !value || value.length === 0

	const { getRootProps, getInputProps, isDragActive, rootRef, open } = useDropzone({
		onDrop,
		onDropRejected,
		accept: "image/jpeg,image/png",
		noClick: true,
		multiple: false
	})

	const clickDropzone = () => {
		open()
	}

	return (
		<FormElementContainer error={error} info={info} {...rest}>
			<FileHandlerSingleContainer
				{...getRootProps({ hasError: !!error, isEmpty, containerStyles })}
			>
				<input {...getInputProps()} />

				{!isEmpty && <img src={value.previewUrl} alt="" />}
				{isDragActive ? (
					<Overlay alwaysShow>Upuść tutaj by dodać</Overlay>
				) : (
					<Overlay alwaysShow>
						<IconContainer onClick={clickDropzone}>
							<FontAwesomeIcon icon="plus" size="2x" fixedWidth />
							<TextBlock centered>{!isEmpty ? "Zmień" : "Dodaj"}</TextBlock>
						</IconContainer>
						<IconContainer onClick={onClear}>
							<FontAwesomeIcon icon="trash" size="2x" fixedWidth />
							<TextBlock centered>Usuń</TextBlock>
						</IconContainer>
					</Overlay>
				)}
			</FileHandlerSingleContainer>
		</FormElementContainer>
	)
}

FileHandlerSingle.propTypes = {
	info: PropTypes.string,
	error: PropTypes.string,
	disabled: PropTypes.bool,
	value: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	containerStyles: PropTypes.any
}

export default FileHandlerSingle
