import React from "react"
import moment from "moment"
import styled from "styled-components/macro"

import Button, { ButtonContainer } from "../../../components/Button"

import { useFirebase, useLiveCollection } from "../../../hooks"
import LoadingSpinner from "../../../components/LoadingSpinner"

const DesignerRequest = styled.div`
	background: white;
	border: 1px solid var(--gray75);
	padding: var(--spacing3);
	margin-bottom: var(--spacing2);

	h3 {
		margin: 0;
	}
`

const OuterContainer = styled.div`
	margin: var(--spacing4) 0;
	h2 {
		margin: 0;
	}
`

const RequestedDesigners = () => {
	const { requestedDesigners, isEmpty, isLoading } = useLiveCollection(
		"requestedDesigners"
	)
	const firebase = useFirebase()

	const markAsDone = async (request) => {
		const res = window.confirm(`Na pewno?`)
		if (!res) return

		if (request.user) {
			const confirmDesignerAdded = firebase.functions.httpsCallable(
				"confirmDesignerAdded"
			)
			await confirmDesignerAdded({ userId: request.user })
		}

		// remove the request from the list
		await firebase.db
			.collection("requestedDesigners")
			.doc(request.id)
			.delete()
	}

	const deleteRequest = async (request) => {
		const res = window.confirm(`Czy napewno usunąć prośbę (${request.name})`)
		if (!res) return

		// remove the request from the list
		await firebase.db
			.collection("requestedDesigners")
			.doc(request.id)
			.delete()
	}

	return (
		<OuterContainer>
			<h2>Prośby o dodanie</h2>
			{isEmpty ? (
				<div>Brak</div>
			) : isLoading ? (
				<LoadingSpinner />
			) : (
				requestedDesigners.map((request) => (
					<DesignerRequest>
						<h3>{request.name}</h3>
						<div>Requested At: {moment(request.requestedAt).format("LL")}</div>
						<ButtonContainer>
							<Button onClick={() => markAsDone(request)}>Potwierdź dodanie</Button>
							<Button danger onClick={() => deleteRequest(request)}>
								Usuń
							</Button>
						</ButtonContainer>
					</DesignerRequest>
				))
			)}
		</OuterContainer>
	)
}

export default RequestedDesigners
