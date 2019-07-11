import React from "react"
import { withRouter } from "react-router-dom"
import Button from "../Button"
import { ROUTES } from "../../constants"

const ClearAllFiltersButton = withRouter(({ history, onClick }) => (
	<Button
		danger
		onClick={() => {
			history.replace(ROUTES.MARKETPLACE)
			onClick(true)
		}}
		fullWidth
	>
		Wyczyść filtry
	</Button>
))

export default ClearAllFiltersButton
