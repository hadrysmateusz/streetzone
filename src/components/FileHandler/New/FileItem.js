import React from "react"
import styled from "styled-components/macro"
import Ratio from "react-ratio"
import PropTypes from "prop-types"
import { overlayCommon } from "../../../style-utils"
import Icon from "../../Icon"
import { TextBlock } from "../../StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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

const IconContainer = styled.div`
	text-align: center;
	padding: var(--spacing1) var(--spacing2);
	margin: 0 var(--spacing1);
	transition: transform 0.12s linear;
	cursor: pointer;
	:hover {
		color: var(--gray100);
		transform: scale(1.03);
	}
`

const IndicatorIcon = styled(FontAwesomeIcon)`
	color: ${(p) => p.color};
`

const IndicatorsContainer = styled.div`
	position: absolute;
	z-index: 90;
	top: var(--spacing2);
	right: var(--spacing2);
	display: grid;
	gap: var(--spacing2);
`

const PureFileItem = ({ id, previewUrl, error, onDelete, onSetMain, isMain }) => {
	const hasError = !!error

	return (
		<Ratio ratio={6 / 7}>
			<Thumbnail hasError={hasError}>
				<IndicatorsContainer>
					{hasError && (
						<IndicatorIcon
							color="var(--error50)"
							title={error}
							icon="exclamation-circle"
						/>
					)}
					{isMain && <IndicatorIcon color="var(--accent50)" icon="star" />}
				</IndicatorsContainer>
				<img src={previewUrl} alt="" />
				<div className="overlay">
					<IconContainer onClick={() => onSetMain(id)}>
						<FontAwesomeIcon icon={["far", "star"]} size="2x" />
						<TextBlock centered>Główne</TextBlock>
					</IconContainer>
					<IconContainer onClick={() => onDelete(id)}>
						<FontAwesomeIcon icon="trash" size="2x" />
						<TextBlock centered>Usuń</TextBlock>
					</IconContainer>
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
