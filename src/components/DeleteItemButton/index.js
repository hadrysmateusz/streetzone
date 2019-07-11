import React from "react"
import { withRouter, Link } from "react-router-dom"

import { Button } from "../Button"

import { route } from "../../utils"

const DeleteButton = withRouter(({ id, location }) => {
	return (
		<Button
			fullWidth
			as={Link}
			to={{ pathname: route("ITEM_DELETE", { id }), state: { redirectTo: location } }}
		>
			Usuń
		</Button>
	)
})

export default DeleteButton
