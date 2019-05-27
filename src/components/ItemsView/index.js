import styled from "styled-components/macro"

export const ItemsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
	justify-items: center;
	gap: 3px;
`

export const ItemsList = styled.div`
	display: grid;
	gap: var(--spacing3);
`

export const ItemsGrid = styled.div`
	display: grid;
	gap: var(--spacing2);
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`
