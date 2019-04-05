import React from "react"
import styled from "styled-components/macro"

const StyledTable = styled.table`
	width: 100%;
	margin: var(--spacing1) -3px var(--spacing2);
	th {
		font-weight: normal;
		text-align: left;
	}
	td {
		font-weight: bold;
		text-align: right;
	}
	font-size: var(--font-size--m);
`

const DataDisplay = ({ children, textSize }) => {
	return <StyledTable textSize={textSize}>{children}</StyledTable>
}

export default DataDisplay
