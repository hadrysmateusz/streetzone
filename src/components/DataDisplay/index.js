import React from "react"
import styled from "styled-components"

const StyledTable = styled.table`
	width: 100%;
	th {
		font-weight: normal;
		text-align: left;
	}
	td {
		font-weight: bold;
		text-align: right;
	}
	font-size: var(--font-size--l);
`

const DataDisplay = ({ children, textSize }) => {
	return <StyledTable textSize={textSize}>{children}</StyledTable>
}

export default DataDisplay
