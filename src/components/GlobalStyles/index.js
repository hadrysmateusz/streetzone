import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
 :root {
	/* base font size for the rem units */
	font-size: 10px;

	--color-messenger: #009bfa;
	--color-facebook: #3c5a99;
	--color-twitter: #1da1f2;

	--glass: rgba(255, 255, 255, 0.93);

	--error0: #b42121;
	--error50: #e63b27;
	--error100: #ffdeda;

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

	--accent25: #efd00a;
	--accent50: #ffde5b;

	--almost-white: #f9f9f9;

	--spacing-base: 4px;
	--spacing1: calc(var(--spacing-base) * 1);
	--spacing2: calc(var(--spacing-base) * 2);
	--spacing3: calc(var(--spacing-base) * 4);
	--spacing4: calc(var(--spacing-base) * 8);
	--spacing5: calc(var(--spacing-base) * 16);
	--spacing6: calc(var(--spacing-base) * 32);

	--font-size--xs: 1rem;
	--font-size--s: 1.4rem;
	--font-size--m: 1.8rem;
	--font-size--l: 2.4rem;
	--font-size--xl: 3.2rem;
	--font-size--xxl: 4.8rem;

	--font-family--serif: "Playfair Display";
	--font-family--sans-serif: "Open Sans";

	--form-element-height: 40px;

	--page-header-height: 52px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--page-header-height: 60px;
	}

	/* new aliases */

	--ff-serif: var(--font-family--serif);
	--ff-sans: var(--font-family--sans-serif);

	--fs-xs: var(--font-size--xs);
	--fs-s: var(--font-size--s);
	--fs-m: var(--font-size--m);
	--fs-l: var(--font-size--l);
	--fs-xl: var(--font-size--xl);
	--fs-xxl: var(--font-size--xxl);
}

body {
	padding: 0;
	margin: 0;

	/* base typography */
	font-weight: 400;
	font-size: var(--font-size--s);
	line-height: 1.5;
	font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
		"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;

	overflow-y: scroll;
	overflow-x: hidden;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

a {
	text-decoration: none;
	color: inherit;
}

`

export default GlobalStyle
