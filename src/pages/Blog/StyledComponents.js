import styled from "styled-components/macro"
import { ellipsis } from "../../style-utils"

export const PostsContainer = styled.div`
	display: grid;
	gap: 10px;
`

export const ShareButtons = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, min-content);
	grid-auto-flow: column;
	justify-content: start;
	gap: var(--spacing3);
	color: var(--gray50);
	font-size: var(--font-size--m);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		font-size: var(--font-size--l);
	}
	& > div {
		cursor: pointer;
	}
	& > div:hover svg {
		color: var(--black75);
	}
`

export const TagsContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	> *:not(:last-child) {
		margin-right: var(--spacing2);
		${ellipsis}
	}
	color: var(--gray50);
`

export const Post = styled.div`
	a {
		display: grid;
		grid-template-columns: 100px 1fr;
		grid-template-rows: auto;
		gap: var(--spacing3);
		overflow: hidden;
		padding: var(--spacing3);

		background: var(--almost-white);
		justify-content: start;

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: 200px 1fr;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			grid-template-columns: 300px 1fr;
			gap: var(--spacing4);
		}
	}
`

export const ImageContainer = styled.div`
	max-width: 100%;
	max-height: 100%;

	width: 100%;
	height: 100%;

	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: flex-start;

	overflow: hidden;

	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		/* align-items: center; */
	}
`

export const Image = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;

`

export const DetailsContainer = styled.div`
	color: var(--gray0);
	font-size: var(--font-size--xs);
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		font-size: var(--font-size--s);
	}
`

export const MainContainer = styled.div`
	display: grid;
	align-content: start;
	gap: var(--spacing1);
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		gap: var(--spacing2);
	}
`

export const PromotedContainer = styled.div`
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 2fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: var(--spacing3);
		height: 440px;
		> *:first-child {
			grid-row: span 2;
		}
	}
`

export const PromotedPostContainer = styled.div`
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
		url(${(p) => p.image});
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	color: white;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	padding: var(--spacing3) 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding: var(--spacing4) 0;
	}
`

export const MainGrid = styled.div`
	display: grid;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 4fr;
	}
	gap: var(--spacing4);
`

export const SidebarContainer = styled.aside``

export const ContentArea = styled.main``

export const SectionContainer = styled.section`
	margin-bottom: var(--spacing4);

	header {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--spacing3);
	}

	.content {
		display: grid;
		gap: var(--spacing2);
		grid-auto-columns: 70%;
		overflow: auto;
		width: auto;
		grid-auto-flow: column;
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			grid-auto-flow: column;
			grid-auto-columns: 1fr;
			gap: var(--spacing3);
		}
	}
`

export const SmallPostContainer = styled.div`
	overflow: hidden;
	display: grid;
	grid-template-rows: 180px auto;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		grid-template-rows: 240px auto;
	}
	height: 100%;
	gap: var(--spacing2);
`

export const TagsNavContainer = styled.div`
	display: grid;
	gap: var(--spacing2);
`

export const SectionNavContainer = styled.div`
	display: grid;
	/* gap: var(--spacing1); */
`
