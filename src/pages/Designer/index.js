import React, { useState, useEffect } from "react"
import withRouter from "react-router/withRouter"
import { ROUTES } from "../../constants"

const createURL = (state) => `${ROUTES.MARKETPLACE}?search=${btoa(JSON.stringify(state))}`

const DesignerPage = ({ match, history }) => {
	const [value, setValue] = useState("")

	useEffect(() => {
		setValue(match.params.id)
	})

	const onClick = async () => {
		history.push(createURL({ designers: [value] }))
	}

	return (
		<div>
			<button onClick={onClick}>GO</button>
		</div>
	)
}

export default withRouter(DesignerPage)
