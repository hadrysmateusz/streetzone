import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import styled from "styled-components/macro"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { SmallItemCard } from "../../components/Cards"
import { Button, LoaderButton, ButtonContainer } from "../../components/Button"
import EmptyState from "../../components/EmptyState/new"

import { NotFoundError } from "../../errors"
import { useFlash, useFirebase, useAuthentication } from "../../hooks"
import { getRedirectTo, sleep, route } from "../../utils"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import PageHeading from "../../components/PageHeading"

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
			/* 
			Sleep is used here to prevent redirect before the algolia index gets updated.
			Redirecting too early would mean displaying the deleted item because algolia 
			is not yet aware of its deletion.
			*/
			await sleep(5500)
			setIsDeleting(false)
		}
	}

	return [deleteItem, isDeleting]
}

const DeleteItem = withRouter(({ match, history, location }) => {
	const itemId = match.params.id
	const [item, setItem] = useState(null)
	const [itemError, setItemError] = useState(null)
	const firebase = useFirebase()
	const authUser = useAuthentication()
	const flashMessage = useFlash()
	const [deleteItem, isDeleting] = useDeleteItem(itemId)

	useEffect(() => {
		const getItem = async () => {
			try {
				// Get item from database
				let item = await firebase.getItemData(itemId)

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

	const onDelete = async () => {
		try {
			await deleteItem()

			// show flash message
			flashMessage({ type: "success", textContent: "Usunięto" })

			// redirect
			const redirectTo = getRedirectTo(location)
			history.replace(redirectTo)
		} catch (err) {
			// TODO: error handling
		}
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
					<PageHeading emoji={"🗑️"}>Na pewno usunąć?</PageHeading>
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
})

const DeleteItemPage = () => (
	<StatelessSearchWrapper>
		<DeleteItem />
	</StatelessSearchWrapper>
)

export default DeleteItemPage
