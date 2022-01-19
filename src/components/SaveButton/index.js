import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components/macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useAuthentication, useFirebase, useFlash } from "../../hooks"
import { shakeAnimation, heartbeatAnimation } from "../../style-utils/animations"

import AuthModal from "../AuthModal"
import { Button } from "../Button"

const IconButtonContainer = styled.div`
	padding: var(--spacing1);
	color: var(--gray25);
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;
	font-size: ${(p) => 10 * (p.scale || 1)}px;
	${(p) =>
		!p.isActive &&
		css`
			:hover {
				${(p) => p.animation}
			}
		`}

	.filled {
		color: var(--gray25);
	}
`

export const TYPE = {
	item: {
		actionType: "save",
		attribute: "savedItems",
		text: "Zapisz",
		activeText: "Zapisano",
		icon: "heart",
		animation: heartbeatAnimation
	},
	user: {
		actionType: "save",
		attribute: "followedUsers",
		text: "Obserwuj",
		activeText: "Obserwujesz",
		icon: "bell",
		animation: shakeAnimation
	},
	drop: {
		actionType: "follow",
		attribute: "followedDrops",
		text: "Obserwuj",
		activeText: "Obserwujesz",
		icon: "bell",
		animation: shakeAnimation
	}
}

const useSave = (type, id) => {
	const { attribute, actionType } = TYPE[type]
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [isActive, setIsActive] = useState(false)
	const flashMessage = useFlash()
	const firebase = useFirebase()

	useEffect(() => {
		if (!authUser) return
		const isActive = authUser[attribute] && authUser[attribute].includes(id)
		setIsActive(isActive)
	}, [authUser, id, setIsActive, attribute])

	const toggleSave = async () => {
		const wasActive = isActive
		// Assume the operation will be successful and set state early
		setIsActive(!wasActive)

		try {
			// Get the old list
			const oldList = authUser[attribute] || []
			// Either delete or add to the list
			const newList = wasActive ? oldList.filter((a) => a !== id) : [...oldList, id]
			// Update the db
			await firebase.currentUser().update({ [attribute]: newList })

			// TODO: improve the copy here
			flashMessage({
				type: "success",
				text: wasActive ? "Usunięto z zapisanych" : "Zapisano!",
				details: !wasActive
					? "Zapisane rzeczy znajdziesz w odpowiedniej zakładce na swoim profilu"
					: undefined
			})
		} catch (error) {
			flashMessage({ type: "error", text: "Wystąpił błąd" })
			console.error(error)
			// Revert the state change if there was an error
			setIsActive(wasActive)
		}
	}

	const toggleFollow = async () => {
		const wasActive = isActive
		// Assume the operation will be successful and set state early
		setIsActive(!wasActive)

		try {
			if (!wasActive) {
				// add user to list of subscribers
				firebase.db
					.collection(attribute)
					.doc(id)
					.collection("subscribers")
					.doc(authUser.uid)
					.set({ isSubscribed: true })

				// add to user's list
				firebase.currentUser().update({
					[attribute]: firebase.FieldValue.arrayUnion(id)
				})
			} else {
				// remove user from list of subscribers
				firebase.db
					.collection(attribute)
					.doc(id)
					.collection("subscribers")
					.doc(authUser.uid)
					.delete()

				// remove from user's list
				firebase.currentUser().update({
					[attribute]: firebase.FieldValue.arrayRemove(id)
				})
			}

			flashMessage({
				type: "success",
				text: wasActive ? "Usunięto z obserwowanych" : "Zaobserwowano!"
			})
		} catch (error) {
			flashMessage({ type: "error", text: "Wystąpił błąd" })
			console.error(error)
			// Revert the state change if there was an error
			setIsActive(wasActive)
		}
	}

	const onClick = (e) => {
		e.preventDefault()
		e.stopPropagation()

		switch (actionType) {
			case "save":
				toggleSave()
				break
			case "follow":
				toggleFollow()
				break
			default:
				throw Error("Invalid action type")
		}
	}

	return { isActive, isAuthenticated, onClick }
}

const Icon = ({ isActive, icon }) => (
	<div className="fa-layers fa-fw">
		{isActive ? (
			<FontAwesomeIcon className="filled" icon={icon} />
		) : (
			<FontAwesomeIcon className="outline" icon={["far", icon]} />
		)}
	</div>
)

export const SaveIconButton = ({ type, id, scale }) => {
	const { icon, text, activeText, animation } = TYPE[type]
	const { isActive, onClick, isAuthenticated } = useSave(type, id)

	return (
		<AuthModal>
			{({ open }) => (
				<IconButtonContainer
					onClick={
						isAuthenticated
							? onClick
							: (e) => {
									e.stopPropagation()
									e.preventDefault()
									open()
							  }
					}
					scale={scale}
					animation={animation}
					isActive={isActive}
					title={isActive ? activeText : text}
				>
					<Icon isActive={isActive} icon={icon} />
				</IconButtonContainer>
			)}
		</AuthModal>
	)
}

export const SaveButton = ({ type, id, ...rest }) => {
	const { icon, text, activeText } = TYPE[type]
	const { isActive, onClick, isAuthenticated } = useSave(type, id)

	return (
		<AuthModal>
			{({ open }) => (
				<Button
					onClick={
						isAuthenticated
							? onClick
							: (e) => {
									e.stopPropagation()
									e.preventDefault()
									open()
							  }
					}
					{...rest}
				>
					<Icon isActive={isActive} icon={icon} />
					<div
						css={css`
							margin-left: 3px;
						`}
					>
						{isActive ? activeText : text}
					</div>
				</Button>
			)}
		</AuthModal>
	)
}
