import styled from "styled-components"

export default styled.div`
	position: relative;
	z-index: 0;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	font-size: var(--font-size--m);

	line-height: 1.5;

	font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
		"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;

	a {
		color: inherit;
	}

	--black0: #06080a;
	--black25: #17191b;
	--black50: #282b2d;
	--black75: #323537;
	--black100: #4a4c4e;

	--gray0: #8f8f8f;
	--gray25: #afafaf;
	--gray50: #c6c6c6;
	--gray75: #dadada;
	--gray100: #eaeaea;

	--almost-white: #f8f8f8;

	--font-size--xs: 1.1rem;
	--font-size--s: 1.2rem;
	--font-size--m: 1.4rem;
	--font-size--l: 1.6rem;

	--font-size--h4: 1.8rem;
	--font-size--h3: 2.2rem;
	--font-size--h2: 3.6rem;
	--font-size--h1: 4.2rem;

	--form-element-height: 40px;

	--font-family--serif: "Playfair Display";
	--font-family--sans-serif: "Open Sans";
`
