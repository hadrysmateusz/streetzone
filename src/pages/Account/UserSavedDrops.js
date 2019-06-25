import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"

import LoadingSpinner from "../../components/LoadingSpinner"
import { PageContainer } from "../../components/Containers"
import { BigDropCard } from "../../components/Cards"
import EmptyState from "../../components/EmptyState/new"

import { useFirebase } from "../../hooks"

import { HeaderContainer } from "./Common"

const DropsList = styled.div`
	display: grid;
	gap: var(--spacing3);
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	}
`

const Header = ({ numDrops = 0 }) => {
	return (
		<HeaderContainer>
			Obserwowane dropy <div className="count">{numDrops}</div>
		</HeaderContainer>
	)
}

const UserSavedDrops = ({ user }) => {
	const firebase = useFirebase()
	const [drops, setDrops] = useState(null)
	const [error, setError] = useState(null)

	const userId = user.uid
	const dropIds = user.followedDrops

	// intentionally only include userId as dependency
	// the component shouldn't rerender automatically on unfollowing a drop
	// this prevents the user from accidentaly unfollowing
	useEffect(() => {
		const removeMarkedDrops = (ids) => {
			// create new list of ids by removing marked ids
			const newIds = dropIds.filter((id) => !ids.includes(id))

			if (dropIds.length !== newIds.length) {
				// remove marked ids from saved drops list
				firebase.user(user.uid).update({ followedDrops: newIds })
			}
		}

		const getSavedDrops = async () => {
			try {
				let idsToDelete = []
				let drops = []

				for (let id of dropIds) {
					// get drop document with corresponding id
					const dropDoc = await firebase.drop(id).get()

					// mark for deletion and skip if document doesn't exist
					if (!dropDoc.exists) {
						idsToDelete.push(id)
						continue
					}

					// get drop data
					const drop = dropDoc.data()

					if (drop.isArchived) {
						// TODO: handle archived drops
						continue
					}

					drops.push(drop)
				}

				setDrops(drops)

				removeMarkedDrops(idsToDelete)
			} catch (e) {
				setError(e)
				console.log(e)
			}
		}

		getSavedDrops()
	}, [userId, firebase])

	const numDrops = drops ? drops.length : 0
	const hasDrops = numDrops > 0
	const isLoading = !drops

	return (
		<PageContainer>
			<Header numDrops={numDrops} />
			{error ? (
				<div>Wystąpił problem, spróbuj odświeżyć stronę</div>
			) : isLoading ? (
				<LoadingSpinner />
			) : hasDrops ? (
				<DropsList>
					{drops.map((drop) => (
						<BigDropCard {...drop} key={drop.id} />
					))}
				</DropsList>
			) : (
				<EmptyState header="Nie zaobserwowałeś jeszcze żadnego dropu">
					Tutaj znajdziesz zaobserwowane dropy. Obserwuj dropy by dostawać update-y i
					przypomnienia.
				</EmptyState>
			)}
		</PageContainer>
	)
}

export default UserSavedDrops
