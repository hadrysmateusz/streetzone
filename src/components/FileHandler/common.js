import styled from "styled-components/macro"
import { overlayCommon, overlayCommonStyles } from "../../style-utils"

export const IconContainer = styled.div`
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

export const ErrorContainer = styled.div`
	${overlayCommonStyles}
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 75;
	padding: var(--spacing2);
	font-size: var(--font-size--xs);
`

export const Overlay = styled.div`
	${overlayCommon}
	${overlayCommonStyles}
	z-index: 76;
	${(p) =>
		!p.alwaysShow &&
		`opacity: 0;
    transition: opacity 0.2s ease;    
    &:hover {
      opacity: 1;
    }`}
`
