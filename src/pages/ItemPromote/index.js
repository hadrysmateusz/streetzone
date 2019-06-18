import React, { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"
import axios from "axios"

import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { Button } from "../../components/Button"

import { NotFoundError } from "../../errors"
import { useAuthentication, useFirebase } from "../../hooks"

const EditItemPage = ({ match, history }) => {
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const [error, setError] = useState(null)
	const [item, setItem] = useState(null)
	const itemId = match.params.id

	useEffect(() => {
		const getItem = async () => {
			try {
				// Get item from database
				let item = await firebase.getItemData(match.params.id)

				setItem(item)
			} catch (err) {
				if (error instanceof NotFoundError) {
					setError(err)
				} else {
					throw err
				}
			}
		}

		getItem()
	}, [itemId])

	const onSubmit = async (e) => {
		e.preventDefault()

		var getIPAddress = async function() {
			try {
				const res = await axios.get("https://api.ipify.org")
				return res.data
			} catch (err) {
				// TODO: figure out how to handle this
				console.log(err)
			}
		}

		const ip = await getIPAddress()
		const data = { itemId: item.id, level: 2, customerIp: ip }
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
		}
	}

	return (
		<PageContainer>
			{item ? (
				<div>
					<h3>Promuj: {item.name}</h3>

					<form onSubmit={onSubmit}>
						<Button type="submit">Kup</Button>
					</form>
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
)(EditItemPage)
