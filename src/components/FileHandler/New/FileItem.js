import React from "react"
import styled from "styled-components/macro"
import Ratio from "react-ratio"
import PropTypes from "prop-types"
import { overlayCommon } from "../../../style-utils"
import Icon from "../../Icon"
import { TextBlock } from "../../StyledComponents"

const Thumbnail = styled.div`
	background: var(--gray);
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	position: relative;

	border: 1px solid;
	border-color: ${(p) => (p.hasError ? "var(--error50)" : "var(--gray0)")};

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	.overlay {
		${overlayCommon}
		opacity: 0;

		transition: opacity 0.2s ease;
		background: rgba(0, 0, 0, 0.32);
		text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
		color: white;
		z-index: 89;

		&:hover {
			opacity: 1;
		}
	}
`

const PureFileItem = ({ id, previewUrl, hasError, onDelete }) => {
	return (
		<Ratio ratio={6 / 7}>
			<Thumbnail>
				<img src={previewUrl} alt="" />
				<div className="overlay">
					<div>
						<Icon
							mx="var(--spacing2)"
							px="var(--spacing2)"
							py="var(--spacing1)"
							fontSize="3rem"
							icon={["far", "star"]}
						/>
						<TextBlock centered>Główne</TextBlock>
					</div>
					<div onClick={() => onDelete(id)}>
						<Icon
							mx="var(--spacing2)"
							px="var(--spacing2)"
							py="var(--spacing1)"
							fontSize="3rem"
							icon="trash"
						/>
						<TextBlock centered>Usuń</TextBlock>
					</div>
				</div>
			</Thumbnail>
		</Ratio>
	)
}

PureFileItem.propTypes = {
	previewUrl: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	error: PropTypes.string,
	onDelete: PropTypes.func.isRequired
}

export default PureFileItem
