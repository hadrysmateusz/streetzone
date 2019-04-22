import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const gridStyles = css`
	display: grid;
	grid-template-rows: 160px 104px;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-rows: 200px 104px;
		.category {
			display: block;
		}
	}
	grid-template-columns: 100%;

	.info-container {
		padding: var(--spacing3);

		.price {
			font-size: var(--font-size--s);
		}

		.name {
			font-size: var(--font-size--m);
			overflow: hidden;
		}

		.bottom-container {
			margin-top: var(--spacing2);
		}
	}
`

const listStyles = css`
	display: grid;
	grid-template-rows: 100%;
	grid-template-columns: 1fr minmax(160px, 28%);
	height: 264px;
	.info-container {
		padding: var(--spacing4);

		.price {
			font-size: var(--font-size--m);
		}

		.name {
			font-size: var(--font-size--l);
		}

		.bottom-container {
			margin-top: var(--spacing3);
		}
	}
`

export const Container = styled.div`
	transition: box-shadow 200ms ease;
	min-width: 0;

	:hover {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.11);
	}
	a {
		border: 1px solid var(--gray75);
		overflow: hidden;

		${(p) => (p.viewMode === "list" ? listStyles : p.viewMode === "grid" && gridStyles)}

		.info-container {
			.top-container {
				display: grid;
				grid-template-columns: auto auto 1fr;
				font-size: var(--font-size--xs);
				color: var(--gray0);
				text-transform: uppercase;
				margin-bottom: var(--spacing1);
				white-space: nowrap;
				overflow: ellipsis;

				min-width: 0;
				> * {
					min-width: 0;
					/* overflow: hidden; */
				}

				.designers {
					font-weight: bold;
					margin-left: var(--spacing3);
				}

				.size {
					color: var(--black0);
					text-align: right;
					font-weight: bold;
				}
			}

			.name {
				font-family: var(--font-family--serif);
				font-weight: bold;
				color: var(--black0);
				line-height: 1.5em;
				max-height: 3em;
				overflow: hidden;
			}

			.createdAt {
				font-size: var(--font-size--xs);
				color: var(--gray0);
				margin: var(--spacing2) 0;
			}

			.description {
				max-width: 460px;
				color: var(--black50);
				max-height: 4.5em;
				line-height: 1.5em;
				overflow: hidden;
			}

			.bottom-container {
				display: flex;
				justify-content: space-between;

				.price {
					color: var(--error0);
					font-weight: bold;
				}

				.like-button {
					color: var(--gray25);
				}
			}
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

export const ThumbnailContainer = styled.div`
	min-height: 0; /* prevent content from overflowing container */
	height: 100%;
	flex: 1 1 100%;
	/* overflow: hidden; */
	justify-content: center;
	align-items: center;
	display: flex;

	img {
		width: 100%;
		/* height: 100%; */
	}
`

export const StyledIcon = styled(FontAwesomeIcon)`
	font-size: 5rem;
	path {
		color: ${(p) => p.theme.colors.gray[100]};
	}
`
