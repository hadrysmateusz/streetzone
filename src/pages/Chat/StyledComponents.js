import styled from "styled-components/macro"

export const CloseButton = styled.div`
	cursor: pointer;
	padding: var(--spacing1);
`

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100%;

	height: 90vh;
	overflow-y: auto;

	border: 1px solid var(--gray75);
	margin-bottom: var(--spacing4);

	.sidebar {
		border-right: 1px solid var(--gray75);
		min-width: 200px;
	}
	.chat-container {
		.no-room-selected {
			background: var(--almost-white);
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--gray0);
			user-select: none;
			cursor: default;
		}
	}
`

export const MobileRoomStyles = styled.div`
	width: 100%;
	max-width: 100vw;
	min-width: 0;
	/* height: 100vh; */
	overflow: auto;

	--bottom-container-height: 200px;

	height: calc(100vh - var(--page-header-height));

	display: grid;
	grid-template-columns: 100%;
	grid-template-rows: 1fr auto;

	.messages {
		min-height: 0;
		max-height: 100vh;
		overflow-y: scroll;
		/* height: 400px; */

		padding: var(--spacing3);

		display: grid;
		align-content: start;
		/* use margin instead of gap to get the space after last message */
		> * {
			margin-bottom: var(--spacing3);
		}

		margin-bottom: var(--bottom-container-height);
	}

	.bottom-container {
		border-top: 1px solid var(--gray75);

		min-width: 0;
		max-width: 100vw;
		width: 100%;
		height: var(--bottom-container-height);

		background: white;
		padding: var(--spacing2);
		/* padding-bottom: 50px; */
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}
`

export const RoomStyles = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 0;
	height: 100%;

	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		position: fixed;
		height: 100vh;
		width: 100vw;
		border: none;
		z-index: 9999;
		background: white;
		top: 0;
		left: 0;
		padding-bottom: 30px;

		.bottom-container {
			min-width: 0;
			max-width: 100vw;
			width: 100%;

			background: white;
			padding: var(--spacing2);
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}

	.bottom-container {
		padding: var(--spacing3);
		padding-top: var(--spacing2);
	}

	.messages {
		padding: var(--spacing3);
		display: grid;
		align-content: start;
		gap: var(--spacing3);
		overflow-y: auto;
	}
`

export const TopContainerMobile = styled.div`
	display: flex;
	.back-button {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.7rem;
		margin-right: var(--spacing3);
		cursor: pointer;
	}
`

export const MobileUserInfo = styled.div`
	display: flex;
	align-items: center;
	text-transform: uppercase;
	.name {
		font-weight: bold;
		margin-left: var(--spacing2);
	}
`

export const MessageStyles = styled.div`
	padding: var(--spacing3);
	border-radius: 4px;
	width: auto;
	min-width: 0;
	max-width: 90%;
	color: ${(p) => (p.isAuthor ? "white" : "var(--black50)")};

	background: ${(p) => (p.isAuthor ? "var(--black25)" : "var(--gray100)")};
	justify-self: ${(p) => (p.isAuthor ? "end" : "start")};

	.createdAt {
		font-size: var(--font-size--xs);
		margin-bottom: var(--spacing1);
	}
	.message {
		white-space: pre-wrap;
		word-wrap: break-word;
		font-family: var(--font-family--sans-serif);
		margin: 0;
		margin-top: var(--spacing2);
	}
`

export const RoomTabStyles = styled.div`
	a {
		display: flex;
		align-items: center;
		padding: var(--spacing3);
		> * + * {
			margin-left: var(--spacing2);
		}
	}

	color: var(--black0);
	font-weight: bold;
	font-size: var(--font-size--s);
	text-transform: uppercase;
	border-bottom: 1px solid var(--gray75);
`
