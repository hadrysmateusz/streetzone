import { Form } from "react-final-form"
import styled from "styled-components/macro"

export const StyledForm = styled(Form)`
	display: grid;
	gap: var(--spacing3);
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

	img {
		max-width: 100%;
		max-height: 900px;
	}
`

export const Section = styled.div`
	margin: var(--spacing3) 0;
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
