import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"
import axios from "axios"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { LoaderButton } from "../../components/Button"
import ItemNotFound from "../../components/ItemNotFound"
import HelmetBasics from "../../components/HelmetBasics"

import { NotFoundError } from "../../errors"
import { route } from "../../utils"
import { useFirebase, useAuthentication } from "../../hooks"
import promotingTiers from "../../constants/promotingTiers"

const PageHeader = styled.div`
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	margin: 0 0 var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: var(--spacing3) 0 var(--spacing4);
	}
`

const PromoteOptionsContainer = styled.div`
	display: grid;
	gap: var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: 1fr 1.12fr 1fr;
		align-items: center;
	}

	@media (min-width: ${(p) => p.theme.breakpoints[5]}px) {
		gap: var(--spacing4);
	}
`

const PromoteOptionCardContainer = styled.div`
	@media (max-width: ${(p) => p.theme.breakpoints[2] - 1}px) {
		order: ${(p) => (p.main ? 1 : 2)};
	}
	display: flex;
	flex-direction: column;
	border: 1px solid var(--gray75);
	height: auto;
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		min-height: ${(p) => (p.main ? "480px" : "390px")};
	}
`

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: var(--spacing3);
	width: 100%;
`

const ManualLink = styled.div`
	margin-top: var(--spacing3);
	color: var(--gray0);
	text-transform: uppercase;
	font-size: var(--fs-xs);
	text-align: center;
	:hover {
		color: var(--black0);
	}
`

const Header = styled.div`
	background: ${(p) => (p.main ? "var(--black0)" : "var(--gray75)")};
	color: ${(p) => (p.main ? "white" : "var(--black75)")};
	font-size: var(--fs-m);
	@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
		font-size: ${(p) => (p.main ? "var(--fs-l)" : "var(--fs-m)")};
	}
	padding: var(--spacing2) 0;
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	font-weight: bold;
`

const ErrorContainer = styled.div`
	margin-top: var(--spacing3);
	color: var(--danger50);
	text-transform: uppercase;
	font-size: var(--fs-xs);
	text-align: center;
`

const List = styled.div`
	display: grid;
	gap: var(--spacing3);
	margin-bottom: auto;
	align-content: start;
	flex-grow: 1;
`

const ListItem = styled.div`
	text-align: center;
	color: var(--black0);
	font-size: var(--fs-s);
	@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
		font-size: var(--fs-m);
	}
`

const Price = styled.div`
	font-size: var(--fs-xl);
	font-weight: bold;
	color: var(--black50);
	text-align: center;
	margin: var(--spacing3) 0;

	::after {
		content: "zł";
		color: var(--gray50);
		font-size: var(--fs-l);
		margin-left: var(--spacing2);
	}

	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		font-size: 42px;
	}
`

var getIPAddress = async function() {
	try {
		const res = await axios.get("https://api.ipify.org")
		return res.data
	} catch (err) {
		// TODO: figure out how to handle this
		console.log(err)
	}
}

const PromoteOptionCard = ({ name, price, level, items = [], main = false, itemId }) => {
	const firebase = useFirebase()
	const [isLoading, setIsLoading] = useState(false)
	const [redirectUri, setRedirectUri] = useState()
	const [error, setError] = useState(null)

	const onClick = async () => {
		setIsLoading(true)
		const ip = await getIPAddress()
		const data = { itemId, level, customerIp: ip }
		const promote = firebase.functions.httpsCallable("promote")

		try {
			const res = await promote(data)

			if (!res.data.redirectUri) {
				throw Error("No redirectUri received")
			}

			setRedirectUri(res.data.redirectUri)

			window.open(res.data.redirectUri, "_blank")

			// TODO: investigate this API
			// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
		} catch (err) {
			setError(err)
			console.log("error:", err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<PromoteOptionCardContainer main={main}>
			<Header main={main}>{name}</Header>
			<InnerContainer>
				<List>
					{items.map((item, i) => (
						<ListItem key={i}>{item}</ListItem>
					))}
				</List>
				<Price>{price}</Price>
				<LoaderButton
					isLoading={isLoading}
					text="Wybierz"
					loadingText="Przekierowywanie do płatności"
					fullWidth
					primary
					onClick={onClick}
					disabled={isLoading}
				/>
				{error && (
					<ErrorContainer>Wystąpił problem, spróbuj ponownie później</ErrorContainer>
				)}
				{redirectUri && (
					<ManualLink>
						<a href={redirectUri} target="_blank" rel="noopener noreferrer">
							Jeśli przekierowanie nie nastąpiło automatycznie, kliknij tutaj by przejść
							do płatności.
						</a>
					</ManualLink>
				)}
			</InnerContainer>
		</PromoteOptionCardContainer>
	)
}

const ItemPromotePage = ({ match, history, location }) => {
	const firebase = useFirebase()
	const [itemError, setItemError] = useState(null)
	const authUser = useAuthentication()
	const [item, setItem] = useState(null)
	const itemId = match.params.id

	useEffect(() => {
		const getItem = async () => {
			try {
				// Get item from database
				let item = await firebase.getItemData(itemId)

				if (!item) throw new NotFoundError()

				if (item.userId !== authUser.uid) {
					history.replace(route("SIGN_IN"), {
						redirectTo: location,
						redirectReason: {
							message: "Nie masz wystarczających pozwoleń"
						}
					})
				}

				setItem(item)
			} catch (err) {
				if (err instanceof NotFoundError) {
					setItemError(err)
				} else {
					throw err
				}
			}
		}

		getItem()
	}, [firebase, itemId, authUser.uid, history, location])

	return (
		<PageContainer>
			{itemError ? (
				<ItemNotFound />
			) : item ? (
				<div>
					<HelmetBasics fullTitle="Promuj ogłoszenie" />
					<PageHeader>
						<span role="img" aria-label="promowane">
							🔥 Promuj {item.name}
						</span>
					</PageHeader>

					<PromoteOptionsContainer>
						<PromoteOptionCard
							name={promotingTiers[0]}
							level={0}
							price={4.99}
							itemId={itemId}
							items={[
								<div>
									<b>7 dni</b> promowania na tablicy
								</div>
							]}
						/>
						<PromoteOptionCard
							name={promotingTiers[1]}
							level={1}
							price={9.99}
							itemId={itemId}
							main
							items={[
								<div>
									<b>10 dni</b> promowania na tablicy
								</div>,
								<div>
									<b>5</b> dodatkowych odświeżeń
								</div>
							]}
						/>
						<PromoteOptionCard
							name={promotingTiers[2]}
							level={2}
							price={25}
							itemId={itemId}
							items={[
								<div>
									<b>14 dni</b> promowania na tablicy
								</div>,
								<div>
									<b>10</b> dodatkowych odświeżeń
								</div>,
								<div>
									<b>7 dni</b> promowania na stronie głównej
								</div>,
								<div>
									<b>Promowanie na instagramie</b>
								</div>
							]}
						/>
					</PromoteOptionsContainer>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</PageContainer>
	)
}

export default withRouter(ItemPromotePage)
