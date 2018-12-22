import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components"

import { MiniButton } from "../Basics"
import { CSS } from "../../constants"

const ContainerError = css`
	border: 4px solid rgb(216, 16, 16);
`
const Container = styled.div`
	box-sizing: content-box;
	user-select: none;
	border: 1px solid ${CSS.COLOR_BLACK_LIGHTER};
	height: 177px;
	position: relative;
	${(props) => props.error && ContainerError}
`

const Thumbnail = styled.div`
	background: ${CSS.COLOR_THUMBNAIL_BG};
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	img {
		max-height: 100%;
		max-width: 100%;
	}
`

const FileItem = (props) => (
	<Container error={props.error}>
		<Thumbnail>
			<img src={props.fileItem.previewUrl} alt="" />
		</Thumbnail>
		<MiniButton
			title="Usuń zdjęcie"
			size={36}
			position={{ top: "7px", right: "7px" }}
			onClick={() => props.onDelete(props.fileItem.id)}
		>
			<FontAwesomeIcon icon="times" />
		</MiniButton>
		{props.error && (
			<MiniButton
				title={props.error}
				size={36}
				position={{ top: "47px", right: "7px" }}
				error
			>
				<FontAwesomeIcon icon="exclamation" />
			</MiniButton>
		)}
	</Container>
)

export default FileItem
