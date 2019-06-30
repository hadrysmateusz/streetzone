import React from "react"
import { withRouter } from "react-router-dom"
import styled from "styled-components/macro"

import { StatefulModal, Modal } from "../Modal/new"
import { Button, ButtonContainer } from "../Button"
import PageHeading from "../PageHeading"

import { useFirebase, useFlash } from "../../hooks"
import { route } from "../../utils"

const ModalContainer = styled.div`
	padding: var(--spacing4);
`

const SignOut = withRouter(({ history, children }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const onSignOut = () => {
		try {
			firebase.signOut()
			flashMessage("Wylogowano")
			history.push(route("HOME"))
		} catch {
			flashMessage("Wystąpił błąd")
		}
	}

	return (
		<StatefulModal>
			{({ open, close, isOpen, modal }) => (
				<>
					{children({ open, close, isOpen, modal })}
					{modal(
						<ModalContainer>
							<PageHeading>Na pewno wylogować?</PageHeading>
							<ButtonContainer vertical noMargin>
								<Button
									onClick={() => {
										// force-close modal even on HomePage
										close()
										// sign out
										onSignOut()
									}}
									danger
									big
								>
									Tak, wyloguj
								</Button>
								<Button onClick={close}>Nie, wróć</Button>
							</ButtonContainer>
						</ModalContainer>
					)}
				</>
			)}
		</StatefulModal>
	)
})

export const StatelessSignOut = withRouter(({ history, children }) => {
	const firebase = useFirebase()
	const flashMessage = useFlash()

	const onSignOut = () => {
		try {
			firebase.signOut()
			flashMessage("Wylogowano")
			history.push(route("HOME"))
		} catch {
			flashMessage("Wystąpił błąd")
		}
	}

	return (
		<Modal>
			{({ open, close, isOpen, modal }) => (
				<>
					{children({ open, close, isOpen, modal })}
					{modal(
						<ModalContainer>
							<PageHeading>Na pewno wylogować?</PageHeading>
							<ButtonContainer vertical noMargin>
								<Button onClick={onSignOut} danger big>
									Tak, wyloguj
								</Button>
								<Button onClick={close}>Nie, wróć</Button>
							</ButtonContainer>
						</ModalContainer>
					)}
				</>
			)}
		</Modal>
	)
})

export const SignOutButton = () => (
	<SignOut>
		{({ open }) => (
			<Button type="button" onClick={open} fullWidth big>
				Wyloguj
			</Button>
		)}
	</SignOut>
)

export default SignOut
