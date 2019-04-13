import React, { useState, useEffect } from "react"
import styled from "styled-components/macro"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Modal from "../Modal"
import { Button } from "../Button"

import { useAuthentication, useFirebase } from "../../hooks"

export const TYPE = {
	ITEM: "savedItems",
	USER: "followedUsers"
}

const INVALID_TYPE_ERR = "SaveButton needs a valid type"

const HeartButtonContainer = styled.div`
	background: rgba(255, 255, 255, 1);
	padding: var(--spacing1);
	color: var(--black0);
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	transition: transform 0.2s ease;

	font-size: ${(p) => 10 * (p.scale || 1)}px;

	.filled {
		color: var(--accent50);
	}

	:hover {
		transform: scale(1.1);
	}
`

const SaveButtonLogic = ({ id, type, children }) => {
	const firebase = useFirebase()
	const [authUser, isAuthenticated] = useAuthentication(true)
	const [isSaved, setIsSaved] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const checkIfSaved = () => {
		const isSaved = isAuthenticated && authUser[type] && authUser[type].includes(id)

		setIsSaved(isSaved)
	}

	const toggleSaved = async () => {
		const wasSaved = isSaved
		// Assume the operation will be successful and set state early
		setIsSaved(!wasSaved)

		try {
			// Get the old list
			const oldList = authUser[type] || []
			// Either delete or add to the list
			const newList = wasSaved ? oldList.filter((a) => a !== id) : [...oldList, id]
			// Update the db
			await firebase.currentUser().update({ [type]: newList })
		} catch (error) {
			console.log(error)
			// Revert the state change if there was an error
			setIsSaved(wasSaved)
		}
	}

	const onClick = (e) => {
		e.preventDefault()

		if (isAuthenticated) {
			toggleSaved()
		} else {
			setShowModal(true)
		}
	}

	useEffect(() => {
		checkIfSaved()
	}, [authUser, id, type])

	if (!Object.values(TYPE).includes(type)) {
		console.error(INVALID_TYPE_ERR)
		return null
	}

	return [
		children({ isSaved, onClick }),
		<Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
			Zaloguj się
		</Modal>
	]
}

export const HeartButton = ({ type, id, scale, ...props }) => {
	return (
		<SaveButtonLogic type={type} id={id}>
			{({ isSaved, onClick }) => {
				return (
					<HeartButtonContainer onClick={onClick} scale={scale} {...props}>
						<div className="fa-layers fa-fw">
							{isSaved ? (
								<FontAwesomeIcon className="filled" icon="heart" />
							) : (
								<FontAwesomeIcon className="outline" icon={["far", "heart"]} />
							)}
						</div>
					</HeartButtonContainer>
				)
			}}
		</SaveButtonLogic>
	)
}

export const SaveButton = ({ text, savedText, type, id, ...props }) => {
	return (
		<SaveButtonLogic type={type} id={id}>
			{({ isSaved, onClick }) => {
				return (
					<Button onClick={onClick} {...props}>
						<div className="fa-layers fa-fw">
							{isSaved ? (
								<FontAwesomeIcon className="filled" icon="heart" size="xs" />
							) : (
								<FontAwesomeIcon className="outline" icon={["far", "heart"]} size="xs" />
							)}
						</div>{" "}
						{isSaved ? savedText : text}
					</Button>
				)
			}}
		</SaveButtonLogic>
	)
}

SaveButtonLogic.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.func.isRequired
}

HeartButton.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	scale: PropTypes.number
}

SaveButton.propTypes = {
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	savedText: PropTypes.string.isRequired
}
