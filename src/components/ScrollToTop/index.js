import styled from "styled-components"

const ScrollToTop = styled.button.attrs((p) => ({
	onClick: () => document.getElementById(p.element || "App-Element").scrollIntoView(true)
}))`
	--size: 60px;
	--offset: 15px;
	--font-size: 1rem;
	background: ${(p) => p.theme.colors.black[25]};
	color: white;
	border: none;
	outline: none;
	box-shadow: none;
	border-radius: 50%;
	position: sticky;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.48);
	cursor: pointer;
	:hover {
		background: black;
	}
	float: right;
	font-size: var(--font-size);
	bottom: var(--offset);
	margin: var(--offset);
	width: var(--size);
	height: var(--size);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--size: 70px;
		--offset: 30px;
		--font-size: 1.3rem;
	}
`

export default ScrollToTop
