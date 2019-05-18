import styled, { css } from "styled-components/macro"
import { ellipsis, overlayTextShadow } from "../../style-utils"

export const PostsContainer = styled.div`
	display: grid;
	grid-template-columns: 100%;
	gap: 10px;
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		margin: 0 calc(var(--spacing3) * -1);
	}
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
			grid-template-columns: 275px 1fr;
			gap: var(--spacing4);
		}
	}
`

export const FluidImage = styled.div`
	width: 100%;
	height: 100%;
	background-image: url("${(p) => p.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
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
	padding-top: var(--spacing2);
	gap: var(--spacing1);
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		gap: var(--spacing2);
	}
`

export const PromotedContainer = styled.div`
	display: grid;
	gap: var(--spacing2);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing3);
		height: 40vw;
		max-height: 500px;
	}
`

const promotedCommon = css`
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	padding: var(--spacing3) 0;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		padding: var(--spacing4) 0;
	}
`

export const PromotedPostContainer = styled.div`
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.65) 100%),
		url(${(p) => p.image});
	color: white;
	${overlayTextShadow}
	${promotedCommon}
`

export const PromotedDropContainer = styled.div`
	background: url(${(p) => p.image});
	color: var(--black75);
	border: 1px solid var(--gray75);
	${promotedCommon};
`

export const MainGrid = styled.div`
	display: grid;
	gap: var(--spacing3);

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: minmax(180px, 1fr) 4fr;
	}
	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		gap: var(--spacing4);
	}
`

export const SidebarContainer = styled.aside``

export const ContentArea = styled.main`
	min-width: 0;
`

export const GroupContainer = styled.section`
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
			grid-template-columns: repeat(3, 1fr);
			gap: var(--spacing3);
		}
	}
`

export const SmallPostContainer = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	border-radius: 3px;
	padding: var(--spacing3);
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
