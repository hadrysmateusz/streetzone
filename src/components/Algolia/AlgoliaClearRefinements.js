import styled from "styled-components"
import { ClearRefinements } from "react-instantsearch-dom"

const AlgoliaClearRefinements = styled(ClearRefinements)`
	width: 100%;
	.ais-ClearRefinements-button {
		border: 1px solid;
		border-color: ${(p) => (p.disabled ? "#d7d7d7" : "#c6c6c6")};
		background: ${(p) => (p.primary ? "#282828" : `white`)};
		color: ${(p) => (p.primary ? "white" : "#3e3e3e")};
		${(p) => p.disabled && `color: #c3c3c3;`}
		${(p) => p.fullWidth && "margin: 4px 0;"}
		padding: 0.8rem 1.85rem;
		text-align: center;
		font-size: 0.79rem;
		display: inline-block;
		font-weight: 500;
		${(p) => p.disabled && `font-weight: normal;`}
		line-height: 0.79rem;
		width: 100%;

		cursor: pointer;
		:hover {
			background: "#282828";
			border-color: "#282828";
			color: "white";
		}
		:focus {
			border: 1px solid ${(p) => p.theme.colors.accent};
			outline: none;
		}
	}
`

export default AlgoliaClearRefinements
