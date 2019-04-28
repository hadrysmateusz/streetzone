import styled from "styled-components/macro"
import { overlayCommon } from "../../../../style-utils"

export const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: 100%;
`

export const ContentEditorContainer = styled.div`
	display: grid;
	max-width: 100%;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing2);

	> * {
		min-width: 0;
	}
`

export const PreviewStyles = styled.div`
	width: 100%;
	margin: 0 auto;
	border: 1px solid var(--gray25);
	padding: 0 var(--spacing2);
	position: relative;

	:empty {
		::before {
			${overlayCommon}
			content: "Podgląd";
			color: var(--gray100);
			font-size: 3.5rem;
			font-weight: bold;
		}
	}

	img {
		max-width: 100%;
		max-height: 900px;
	}
`

export const Section = styled.div`
	${(p) => p.flex && `display: flex;`}

	.sub-section {
		flex: 1 1 50%;
		:not(:last-child) {
			margin-right: var(--spacing2);
		}
	}

	.header {
		font-weight: bold;
	}
`
