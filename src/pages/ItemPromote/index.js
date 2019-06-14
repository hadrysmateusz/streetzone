import React, { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter } from "react-router-dom"

import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"

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

	return (
		<PageContainer>
			{item ? (
				<div>
					<h3>Promuj: {item.name}</h3>
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
