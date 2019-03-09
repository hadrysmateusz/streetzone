import styled from "styled-components"

export default styled.div`
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	font-size: 10px;
	font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
		"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;

	/* Not using :any-link as it causes issues in edge and ie */
	a {
		color: black; /* fallback for ie */
		color: unset;
		text-decoration: none;
	}
`
