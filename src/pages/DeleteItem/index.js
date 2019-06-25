import React, { useState, useEffect } from "react"
import { compose } from "recompose"
import { withRouter, Link } from "react-router-dom"
import styled from "styled-components/macro"

import { withAuthorization } from "../../components/UserSession"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { SmallItemCard } from "../../components/Cards"
import { Button, LoaderButton, ButtonContainer } from "../../components/Button"
import EmptyState from "../../components/EmptyState/new"

import { NotFoundError } from "../../errors"
import { useFlash, useFirebase } from "../../hooks"
import { getRedirectTo } from "../../utils"

const PageHeader = styled.div`
	font-weight: bold;
	text-align: center;
	text-transform: uppercase;
	margin: 0 0 var(--spacing3);
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		margin: var(--spacing3) 0 var(--spacing4);
	}
`

const OuterContainer = styled.div`
	max-width: 430px;
	margin: 0 auto;
`

const ItemContainer = styled.div`
	margin: 0 auto var(--spacing3);
	max-width: 225px;
	@media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
		max-width: 270px;
	}
`

const Disclaimer = styled.div`
	color: var(--gray0);
	text-transform: uppercase;
	margin-bottom: var(--spacing3);
	text-align: center;
	font-size: var(--fs-xs);
`

// the id is passed in because the loading state should only refer to a single item
const useDeleteItem = (id) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const firebase = useFirebase()

	const deleteItem = async () => {
		setIsDeleting(true)
		try {
			await firebase.item(id).update({ isArchived: true, archivedAt: Date.now() })
		} catch (err) {
			throw err
		} finally {
			setIsDeleting(false)
		}
	}

	return [deleteItem, isDeleting]
}

const useItem = (id) => {
	const [item, setItem] = useState(null)
	const [error, setError] = useState(null)
	const firebase = useFirebase()

	useEffect(() => {
		const getItem = async () => {
			try {
				// Get item from database
				let item = await firebase.getItemData(id)

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
	}, [id, firebase])

	return [item, error]
}

const ItemPromotePage = ({ match, history, location }) => {
	const itemId = match.params.id

	const flashMessage = useFlash()
	const [item, itemError] = useItem(itemId)
	const [deleteItem, isDeleting] = useDeleteItem(itemId)

	const onDelete = async () => {
		try {
			await deleteItem()

			// show flash message
			flashMessage({ type: "success", textContent: "Usunięto" })

			// redirect
			const redirectTo = getRedirectTo(location)
			history.replace(redirectTo)
		} catch (err) {}
	}

	return (
		<PageContainer>
			{itemError ? (
				<EmptyState header="Nie znaleziono przedmiotu">
					<div>Być może został już usunięty</div>
					<Button as={Link} to={getRedirectTo(location)}>
						Nie, wróć
					</Button>
				</EmptyState>
			) : (
				<>
					<PageHeader>
						<span role="img" aria-label="promowane">
							🔥 Na pewno usunąć?
						</span>
					</PageHeader>
					{item ? (
						<OuterContainer>
							<ItemContainer>
								<SmallItemCard {...item} />
							</ItemContainer>
							<Disclaimer>Na pewno usunąć? Tej akcji nie da się cofnąć.</Disclaimer>
							<ButtonContainer vertical noMargin>
								<LoaderButton
									text="Tak, Usuń"
									loadingText="Usuwanie..."
									isLoading={isDeleting}
									onClick={onDelete}
									danger
									big
								/>
								<Button as={Link} to={getRedirectTo(location)}>
									Nie, wróć
								</Button>
							</ButtonContainer>
						</OuterContainer>
					) : (
						<LoadingSpinner />
					)}
				</>
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
