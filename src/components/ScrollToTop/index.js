import styled from "styled-components/macro"

const ScrollToTop = styled.button.attrs((p) => ({
	onClick: () => document.getElementById(p.element || "App-Element").scrollIntoView(true)
}))`
	--size: 60px;
	--offset: 15px;
	--font-size: 1.1rem;
	background: rgba(255, 255, 255, 0.88);
	border: 1px solid var(--gray75);
	color: var(--black75);
	outline: none;
	box-shadow: none;
	border-radius: 50%;
	box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.28);
	cursor: pointer;
	:hover {
		background: white;
	}
	position: sticky;
	float: right;
	font-size: var(--font-size);
	bottom: var(--offset);
	right: var(--offset);
	/* 
	make the elements above ignore the height and offset of the button 
	the additional 20px is to make the size of the last item visible
	*/
	margin-top: calc((var(--size) + var(--offset)) * -1);
	width: var(--size);
	height: var(--size);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--offset: 30px;
		--font-size: 1.5rem;
	}
`

export default ScrollToTop
