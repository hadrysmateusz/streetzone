import styled from "styled-components/macro"

export const Menu = styled.div`
	height: 100%;

	.menu-header {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-auto-flow: column;

		border-bottom: 1px solid var(--gray75);
		padding: var(--spacing3);
		display: grid;
		grid-template-columns: 1fr auto;
		grid-auto-flow: column;
		align-items: center;
	}
`

export const CloseButton = styled.div`
	cursor: pointer;
	padding: var(--spacing1);
`

export const OuterContainerMobile = styled.div`
	position: fixed;
	height: 100vh;
	width: 100vw;
	border: none;
	z-index: 9999;
	background: white;
	top: 0;
	left: 0;
	overflow-y: auto;

	.empty-state {
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
`

export const MobileRoomStyles = styled.div`
	width: 100%;
	max-width: 100vw;
	min-width: 0;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100vh;
	background: white;
	overflow: auto;

	.top-container {
		border-bottom: 1px solid var(--gray75);
		padding: var(--spacing3);
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-auto-flow: column;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: var(--glass);

		.back-button {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.7rem;
			margin-right: var(--spacing3);
		}
	}

	.messages {
		max-height: 100vh;
		overflow-y: auto;

		padding: var(--spacing3);
		display: grid;
		gap: var(--spacing3);

		padding-bottom: 200px; /* make sure no content is inaccessible */
		padding-top: 80px; /* make sure no content is inaccessible */
	}

	.bottom-container {
		border-top: 1px solid var(--gray75);

		min-width: 0;
		max-width: 100vw;
		width: 100%;

		background: var(--glass);
		padding: var(--spacing2);
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

	.top-container {
		padding: var(--spacing3);
		display: flex;

		.back-button {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.7rem;
			margin-right: var(--spacing3);
		}
	}

	.bottom-container {
		padding: var(--spacing3);
		padding-top: var(--spacing2);
	}

	.messages {
		padding: var(--spacing3);
		display: grid;
		gap: var(--spacing3);
		overflow-y: auto;
	}
`

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 3fr;
	grid-template-rows: 100%;

	height: 650px;
	max-height: 80vh;
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

	background: ${(p) => (p.isAuthor ? "#1fc694" : "#f2f3f1")};
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
