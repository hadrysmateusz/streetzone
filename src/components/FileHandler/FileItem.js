import React from "react"
import styled from "styled-components/macro"
import Ratio from "react-ratio"
import PropTypes from "prop-types"
import { TextBlock } from "../StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconContainer, ErrorContainer, Overlay } from "./common"

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
	border-color: ${(p) => (p.hasError ? "var(--error50)" : "var(--gray25)")};

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
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
				<Overlay>
					<IconContainer onClick={() => onSetMain(id)}>
						<FontAwesomeIcon icon={["far", "star"]} size="2x" fixedWidth />
						<TextBlock centered>Główne</TextBlock>
					</IconContainer>
					<IconContainer onClick={() => onDelete(id)}>
						<FontAwesomeIcon icon="trash" size="2x" fixedWidth />
						<TextBlock centered>Usuń</TextBlock>
					</IconContainer>
				</Overlay>
				{hasError && <ErrorContainer>{error}</ErrorContainer>}
			</Thumbnail>
		</Ratio>
	)
}

PureFileItem.propTypes = {
	id: PropTypes.string.isRequired,
	previewUrl: PropTypes.string.isRequired,
	isMain: PropTypes.bool,
	error: PropTypes.string,
	onDelete: PropTypes.func.isRequired,
	onSetMain: PropTypes.func.isRequired
}

PureFileItem.defaultProps = {
	isMain: false
}

export default PureFileItem
