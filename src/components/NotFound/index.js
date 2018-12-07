import React from "react"
import { ROUTES } from "../../constants"

const NotFound = () => {
	return (
		<div>
			<h1>404</h1>
			<div>Strona której szukasz nie została znaleziona</div>
			<p>
				<a href={ROUTES.HOME}>Wróć do strony głównej</a>
			</p>
		</div>
	)
}

export default NotFound
