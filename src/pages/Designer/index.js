import React, { useState, useEffect } from "react"
import withRouter from "react-router/withRouter"

const DesignerPage = ({ match }) => {
	const [value, setValue] = useState("")

	useEffect(() => {
		setValue(match.params.id)
	})

	return (
		<div>
			<h1>{value}</h1>
		</div>
	)
}

export default withRouter(DesignerPage)
