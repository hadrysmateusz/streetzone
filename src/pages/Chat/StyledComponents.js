import styled from "styled-components/macro"

export const OuterContainer = styled.div`
	display: grid;
	grid-template-columns: minmax(200px, 1fr) 3fr;
	grid-template-rows: 100%;
	height: 75vh;
	overflow-y: auto;

	border: 1px solid var(--gray75);
	margin-top: var(--spacing3);
	margin-bottom: var(--spacing3);

	.sidebar {
		border-right: 1px solid var(--gray75);
	}
`

export const NoRoomSelected = styled.div`
	background: var(--almost-white);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--gray0);
	user-select: none;
	cursor: default;
`

export const MobileRoomStyles = styled.div`
	--bottom-container-height: 180px;

	.messages {
		height: 100%;
		min-height: 0;
		padding: var(--spacing3);
		display: grid;
		align-content: start;
		gap: var(--spacing3);
		margin-bottom: var(--bottom-container-height);
	}

	.bottom-container {
		border-top: 1px solid var(--gray75);
		width: 100%;
		height: var(--bottom-container-height);
		background: white;
		padding: var(--spacing2);
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}
`

export const DesktopRoomStyles = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	min-height: 0;
	height: 100%;

	.top-container {
		border-bottom: 1px solid var(--gray75);
		padding: var(--spacing3);
	}

	.messages {
		min-height: 0;
		padding: var(--spacing3);
		display: grid;
		align-content: start;
		/* use margin to preserve the space after last item */
		> * {
			margin-bottom: var(--spacing3);
		}
		overflow-y: auto;
	}

	.bottom-container {
		border-top: 1px solid var(--gray75);
		height: var(--bottom-container-height);
		padding: var(--spacing3);
		padding-top: var(--spacing2);
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
