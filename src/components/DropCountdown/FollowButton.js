import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { shakeAnimation } from "../../style-utils/animations"
import { useAuthentication, useFirebase, useFlash } from "../../hooks"

const HeartButtonContainer = styled.div`
	padding: var(--spacing1);
	color: var(--gray25);
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;

	font-size: ${(p) => 10 * (p.scale || 1)}px;

	.filled {
		color: var(--gray25);
	}

	:hover {
		${shakeAnimation}
	}
`

export const TYPE = {
	ITEM: "savedItems",
	USER: "followedUsers",
	DROP: "followedDrops"
}

const INVALID_TYPE_ERR = "SaveButton needs a valid type"

const FollowButtonLogic = ({ id, type, children }) => {
	const firebase = useFirebase()
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [isSaved, setIsSaved] = useState(false)
	const flashMessage = useFlash()

	const checkIfSaved = () => {
		const isSaved = isAuthenticated && authUser[type] && authUser[type].includes(id)

		setIsSaved(isSaved)
	}

	const toggleFollow = async () => {
		const wasSaved = isSaved
		// Assume the operation will be successful and set state early
		setIsSaved(!wasSaved)

		try {
			if (!wasSaved) {
				// add user to list of subscribers
				firebase
					.drop(id)
					.collection("subscribers")
					.doc(authUser.uid)
					.set({ isSubscribed: true })

				// add drop to list of user's saved drops
				firebase.currentUser().update({
					followedDrops: firebase.FieldValue.arrayUnion(id)
				})
			} else {
				// remove user from list of subscribers
				firebase
					.drop(id)
					.collection("subscribers")
					.doc(authUser.uid)
					.delete()

				// remove drop from list of user's saved drops
				firebase.currentUser().update({
					followedDrops: firebase.FieldValue.arrayRemove(id)
				})
			}

			flashMessage(wasSaved ? "Usunięto z obserwowanych" : "Zaobserwowano!")
		} catch (error) {
			console.log(error)
			// Revert the state change if there was an error
			setIsSaved(wasSaved)
		}
	}

	const onClick = (e) => {
		e.preventDefault()

		if (isAuthenticated) {
			toggleFollow()
		} else {
			// TODO: display auth modal
		}
	}

	useEffect(() => {
		checkIfSaved()
	}, [authUser, id, type])

	if (!Object.values(TYPE).includes(type)) {
		console.error(INVALID_TYPE_ERR)
		return null
	}

	return children({ isSaved, onClick })
}

export default ({ id, ...props }) => {
	return (
		<FollowButtonLogic type={TYPE.DROP} id={id}>
			{({ isSaved, onClick }) => {
				return (
					<HeartButtonContainer
						onClick={onClick}
						scale={1.5}
						{...props}
						title={isSaved ? "Przestań obserwować" : "Obserwuj"}
					>
						<div className="fa-layers fa-fw">
							{isSaved ? (
								<FontAwesomeIcon className="filled" icon="bell" />
							) : (
								<FontAwesomeIcon className="outline" icon={["far", "bell"]} />
							)}
						</div>
					</HeartButtonContainer>
				)
			}}
		</FollowButtonLogic>
	)
}
