import React from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormElementContainer from "./container"
import commonStyles from "./commonStyles"

const StyledInput = styled.input`
	/* only show arrows on hover in firefox */
	&[type="number"] {
		-moz-appearance: textfield;
	}
	&[type="number"]:hover,
	&[type="number"]:focus {
		-moz-appearance: number-input;
	}

	font-size: var(--font-size--s) !important;
	height: var(--form-element-height);
	padding: 0 var(--spacing2);
	${(p) => p.hasIcon && "padding-left: var(--form-element-height);"}
	${(p) => p.hasRightSlot && "padding-right: var(--right-slot-width);"}

	${commonStyles}
`

const InnerContainer = styled.div`
	position: relative;
	--right-slot-width: ${(p) => p.rightSlotWidth || "0"};
`

const IconContainer = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	height: var(--form-element-height);
	width: var(--form-element-height);
	display: flex;
	align-items: center;
	justify-content: center;
	${(p) => p.isDisabled && "color: var(--gray25)"}
`

const RightSlotContainer = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	height: var(--form-element-height);
	width: var(--right-slot-width);
	${"" /* display: flex;
	align-items: center;
	justify-content: center; */}
`

const Input = React.forwardRef(
	({ icon, info, error, disabled, rightSlot, rightSlotWidth, ...rest }, ref) => {
		const hasIcon = !!icon
		const hasRightSlot = !!rightSlot

		return (
			<FormElementContainer error={error} info={info}>
				<InnerContainer rightSlotWidth={rightSlotWidth}>
					{hasIcon && (
						<IconContainer isDisabled={disabled}>
							{icon && <FontAwesomeIcon icon={icon} />}
						</IconContainer>
					)}
					<StyledInput
						ref={ref}
						hasIcon={hasIcon}
						hasRightSlot={hasRightSlot}
						hasError={!!error}
						disabled={disabled}
						{...rest}
					/>
					{hasRightSlot && <RightSlotContainer>{rightSlot}</RightSlotContainer>}
				</InnerContainer>
			</FormElementContainer>
		)
	}
)

export default Input
