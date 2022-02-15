import { createGlobalStyle } from "styled-components/macro"

const GlobalStyles = createGlobalStyle`
 :root {
	/* base font size for the rem units */
	font-size: 10px;

	--app-background-color: #fdfdfe;

	--color-messenger: #009bfa;
	--color-facebook: #3c5a99;
	--color-twitter: #1da1f2;

	--glass: rgba(255, 255, 255, 0.93);

	--danger0: #b42121;
	--danger50: #e63b27;
	--danger100: #ffdeda;

	--success25: #196014;
	--success50: #40B15A;
	--success75: #d0f4cd;

	--black0: #06080a;
	--black25: #17191b;
	--black50: #282b2d;
	--black75: #323537;
	--black100: #4a4c4e;

	--gray0: #8f8f8f;
	--gray25: #afafaf;
	--gray50: #c6c6c6;
	--gray75: #d8d8d8;
	--gray100: #ebebeb;
	--gray125: #f2f2f2;

	--accent25: #efd00a;
	--accent50: #ffde5b;

	--almost-white: #f7f7f8;

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

	/* TODO: the serif font is set to a sans-serif font for testing purposes, 
	determine whether to keep this change or revert it */
	--font-family--serif: "Open Sans";
	--font-family--sans-serif: "Open Sans";

	--page-header-margin: var(--spacing4);
	--form-element-height: 40px;

	--page-header-height: 44px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		--page-header-height: 54px;
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

	--semi-bold: 600;
}

body {
	padding: 0;
	margin: 0;
	background: var(--app-background-color);

	/* base typography */
	font-weight: 400;
	font-size: var(--font-size--s);
	line-height: 1.5;
	font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
		"Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;

	overflow-y: scroll;
	/* overflow-x: hidden; */
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

export default GlobalStyles
