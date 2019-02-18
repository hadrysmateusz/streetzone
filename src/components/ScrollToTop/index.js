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
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.48);
	cursor: pointer;
	:hover {
		background: black;
	}
	position: sticky;
	float: right;
	font-size: var(--font-size);
	bottom: var(--offset);
	right: var(--offset);
	margin-bottom: var(--offset);
	/* 
	make the elements above ignore the height and offset of the button 
	the additional 20px is to make the size of the last item visible
	*/
	margin-top: calc((var(--size) + var(--offset) + 20px) * -1);
	width: var(--size);
	height: var(--size);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--size: 70px;
		--offset: 30px;
		--font-size: 1.3rem;
	}
`

export default ScrollToTop
