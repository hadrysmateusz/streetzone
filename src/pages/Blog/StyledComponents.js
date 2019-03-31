import styled from "styled-components"

export const PostsContainer = styled.div`
	display: grid;
	gap: 10px;
	/* margin: 10px 0;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: 30px 0;
	} */
`

export const Post = styled.div`
	a {
		display: grid;
		grid-template-columns: 100px 1fr;
		grid-template-rows: auto;
		gap: 20px;
		overflow: hidden;
		padding: 15px;

		background: white;
		border: 1px solid ${(p) => p.theme.colors.gray[75]};
		box-shadow: 0 0px 5px -1px rgba(0, 0, 0, 0.05);

		@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
			grid-template-columns: 200px 1fr;
			grid-template-rows: 200px;
		}
		@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
			grid-template-columns: 300px 1fr;
			grid-template-rows: 300px;
			gap: 30px;
		}
		@media (max-width: ${(p) => p.theme.breakpoints[5] - 1}px) {
			border-left: none;
			border-right: none;
		}
	}
	:not(:last-child) a {
		@media (max-width: ${(p) => p.theme.breakpoints[5] - 1}px) {
			/* border-bottom: none; */
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
		align-items: center;
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
	display: grid;
	grid-auto-columns: max-content;
	grid-auto-flow: column;
	gap: 10px;
	margin: 10px 0;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		grid-auto-flow: row;
	}
`

export const PromotedContainer = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;
	height: 440px;
	gap: var(--spacing3);
	> *:first-child {
		grid-row: span 2;
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
	padding-bottom: var(--spacing4);
`

export const MainGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr;
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
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
		gap: var(--spacing3);
	}
`

export const SmallPostContainer = styled.div`
	overflow: hidden;
	display: grid;
	grid-template-rows: 240px auto;
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
