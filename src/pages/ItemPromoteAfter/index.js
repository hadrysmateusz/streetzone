import React from "react"
import { withRouter, Link } from "react-router-dom"
import styled from "styled-components/macro"

import { route } from "../../utils"

import { PageContainer } from "../../components/Containers"
import PageHeading from "../../components/PageHeading"

const Text = styled.div`
	color: var(--gray0);
	font-size: var(--fs-s);
	text-align: center;
	max-width: 430px;
	margin: 0 auto;
	margin-top: var(--spacing3);
`

const StyledLink = styled(Link)`
	color: black;
	text-decoration: underline;
	font-weight: var(--semi-bold);
	cursor: pointer;
`

const ItemPromoteAfter = withRouter(({ location }) => {
	const searchParams = new URLSearchParams(location.search)
	const hasError = searchParams.has("error") && searchParams.get("error") === "501"

	return (
		<PageContainer>
			{hasError ? (
				<>
					<PageHeading emoji={"❌"}>Wystąpił błąd</PageHeading>
					<Text>
						Transakcja zakończyła się niepowodzeniem. W razie pytań co do transakcji{" "}
						<StyledLink to={route("CONTACT")}>skontaktuj się z nami</StyledLink> podając
						numer transakcji, który otrzymałeś w mailu od PayU. Postaramy się odpowiedzieć
						na wszelkie pytania i rozwiązać ten problem.
					</Text>
				</>
			) : (
				<>
					<PageHeading emoji={"🎉"}>Dzięki za zakup</PageHeading>
					<Text>
						Gdy tylko wpłata zostanie zaksięgowana, twoje ogłoszenie otrzyma wszystkie
						benefity. Może to potrwać do 5 minut. Status promowania ogłoszenia możesz
						sprawdzić na <StyledLink to={route("MY_ACCOUNT")}>swoim profilu</StyledLink>.
					</Text>
					<Text>
						Jeśli po 5 minutach twoje ogłoszenie nie otrzyma wszystkich benefitów,{" "}
						{/* TODO: research how long it might take (particularly on weekends etc.) and make sure the copy represents that */}
						<StyledLink to={route("CONTACT")}>napisz do nas</StyledLink> podając numer
						transakcji, który otrzymałeś w mailu od PayU.
					</Text>
				</>
			)}
		</PageContainer>
	)
})

export default ItemPromoteAfter
