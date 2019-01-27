import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components"
import Ratio from "react-ratio"

import { MiniButton } from "../Basics"

const ContainerError = css`
	border: 2px solid ${(p) => p.theme.colors.danger[50]};
`
const Container = styled.div`
	box-sizing: content-box;
	user-select: none;
	border: 1px solid ${(p) => p.theme.colors.gray[0]};
	width: 100%;
	height: 100%;
	position: relative;
	${(props) => props.error && ContainerError}
`

const Thumbnail = styled.div`
	background: ${(p) => p.theme.colors.gray[100]};
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`

const FileItem = (props) => (
	<Ratio ratio={1 / 1}>
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
	</Ratio>
)

export default FileItem
