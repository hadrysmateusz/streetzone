import React, { memo } from "react"
import styled, { css } from "styled-components/macro"
import { Link } from "react-router-dom"

import { PageContainer } from "../Containers"

import { route } from "../../utils"

const OuterContainer = styled.div`
	padding: var(--spacing2) 0;
	color: white;
	background: var(--danger0);
	font-size: var(--fs-xs);

	${(p) =>
		!p.noMargin &&
		css`
			margin-top: calc(-1 * var(--page-header-margin));
			margin-bottom: var(--page-header-margin);
		`}
`

const InnerContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		flex-direction: row;
	}
`

const StyledLink = styled(Link)`
	text-decoration: underline;
	font-weight: var(--semi-bold);
	white-space: nowrap;
	@media (max-width: ${(p) => p.theme.breakpoints[1] - 1}px) {
		margin-top: var(--spacing1);
	}
`

const Message = styled.div`
	em {
		font-style: initial;
		font-weight: var(--semi-bold);
	}
`

const NotificationsDisabledBar = memo(({ noMargin = false }) => {
	const areNotificationsSupported = window.Notification
	const areNotificationsDisabled =
		!areNotificationsSupported || Notification.permission !== "granted"

	return areNotificationsDisabled ? (
		<OuterContainer noMargin={noMargin}>
			<PageContainer>
				<InnerContainer>
					{areNotificationsSupported ? (
						<>
							<Message>
								<em>Powiadomienia są wyłączone</em> - Nie będziesz otrzymywał powiadomień
								o dropach i wiadomościach od innych użytkowników.{" "}
							</Message>
							<StyledLink to={route("ALLOW_NOTIFICATIONS")}>
								Włącz powiadomienia
							</StyledLink>
						</>
					) : (
						<Message>
							<em>Twoja przeglądarka nie wspiera powiadomień</em> - By otrzymywać
							powiadomienia, użyj innej przeglądarki np. Mozilla Firefox, Google Chrome.
						</Message>
					)}
				</InnerContainer>
			</PageContainer>
		</OuterContainer>
	) : null
})

export { NotificationsDisabledBar }
