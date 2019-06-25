import React, { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"
import axios from "axios"

import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { LoaderButton } from "../../components/Button"

import { NotFoundError } from "../../errors"
import { useFirebase } from "../../hooks"

const PageHeader = styled.div`
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	margin: var(--spacing3) 0 var(--spacing4);
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
		height: ${(p) => (p.main ? "450px" : "390px")};
	}
`

const InnerContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: var(--spacing3);
	width: 100%;
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

	const onClick = async () => {
		setIsLoading(true)
		const ip = await getIPAddress()
		const data = { itemId, level, customerIp: ip }
		const promote = firebase.functions.httpsCallable("promote")

		try {
			const res = await promote(data)
			console.log("response:", res)

			if (!res.data.redirectUri) {
				throw Error("No redirectUri received")
			}

			const wasOpened = window.open(res.data.redirectUri, "_blank")
			if (wasOpened === null) {
				// TODO: handle window being blocked by a popup blocker
				// TODO: consider using a different way of showing the payment gateway
				// TODO: add a button/link to manually redirect if it doesn't automatically
				// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
			}
		} catch (err) {
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
			</InnerContainer>
		</PromoteOptionCardContainer>
	)
}

const ItemPromotePage = ({ match, history }) => {
	const firebase = useFirebase()
	const [error, setError] = useState(null)
	const [item, setItem] = useState(null)
	const itemId = match.params.id

	useEffect(() => {
		const getItem = async () => {
			try {
				// Get item from database
				let item = await firebase.getItemData(itemId)

				setItem(item)
			} catch (err) {
				if (err instanceof NotFoundError) {
					setError(err)
				} else {
					throw err
				}
			}
		}

		getItem()
	}, [itemId, firebase])

	return (
		<PageContainer>
			{item ? (
				<div>
					<PageHeader>
						<span role="img" aria-label="promowane">
							🔥 Promuj {item.name}
						</span>
					</PageHeader>

					<PromoteOptionsContainer>
						<PromoteOptionCard
							name="Mini"
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
							name="Hype"
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
							name="Mega"
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

const condition = (authUser, pathParams) => {
	const isAuthenticated = !!authUser
	if (!isAuthenticated) {
		return false
	} else {
		const isAuthorized = authUser.items.includes(pathParams.id)
		return isAuthorized
	}
}

export default compose(
	withRouter,
	withAuthorization(condition)
)(ItemPromotePage)
