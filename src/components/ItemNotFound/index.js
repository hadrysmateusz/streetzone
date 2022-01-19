import React from "react"
import { withRouter } from "react-router-dom"

import { LinkButton } from "../Button"
import EmptyState from "../EmptyState"

import { getRedirectTo } from "../../utils"

const ItemNotFound = withRouter(({ location }) => {
	return (
		<EmptyState header="Nie znaleziono przedmiotu">
			<div>Być może został usunięty</div>
			<LinkButton to={getRedirectTo(location)}>Wróć</LinkButton>
		</EmptyState>
	)
})

export default ItemNotFound
