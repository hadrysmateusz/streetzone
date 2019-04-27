import styled from "styled-components/macro"

import { commonStyles } from "../FormElements"
import { overlayCommon } from "../../style-utils"

export const FileHandlerContainer = styled.div`
	${commonStyles.basicStyles}
	min-height: 150px;

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

	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	gap: var(--spacing3);
	padding: var(--spacing3);
	position: relative;
`

export const EmptyState = styled.div`
	${overlayCommon}
	${commonStyles.placeholderStyles}
`
