import React, { useState, useEffect } from "react"
import { withRouter, Link } from "react-router-dom"
import styled from "styled-components/macro"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { SmallItemCard } from "../../components/Cards"
import { Button, LoaderButton, ButtonContainer } from "../../components/Button"
import PageHeading from "../../components/PageHeading"
import { StatelessSearchWrapper } from "../../components/InstantSearchWrapper"
import ItemNotFound from "../../components/ItemNotFound"
import HelmetBasics from "../../components/HelmetBasics"

import { NotFoundError } from "../../errors"
import { useFlash, useFirebase, useAuthentication } from "../../hooks"
import { getRedirectTo, route } from "../../utils"

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

	const onDelete = async () => {
		try {
			await deleteItem()

			// show flash message
			flashMessage({
				type: "success",
				text: "Usunięto",
				details: "Odśwież stronę za kilka sekund by zobaczyć zmiany",
				ttl: 6000
			})

			// redirect
			const redirectTo = getRedirectTo(location)
			history.replace(redirectTo)
		} catch (err) {
			// TODO: better error handling
			// show flash message
			flashMessage({
				type: "error",
				text: "Wystąpił błąd",
				details: "Ogłoszenie mogło nie zostać usunięte"
			})
		}
	}

	return (
		<PageContainer>
			<HelmetBasics title="Usuń ogłoszenie" />

			{itemError ? (
				<ItemNotFound />
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
