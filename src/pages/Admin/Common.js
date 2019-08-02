import styled from "styled-components/macro"

export const StyledForm = styled.form`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: 100%;
`

export const List = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: 1fr 1fr;

	> * {
		overflow: hidden;
	}
`
