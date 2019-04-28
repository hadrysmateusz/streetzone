import React, { useState } from "react"

import { IconButton } from "../Button"
import Modal from "../Modal"

const DisplayJSONButton = ({ values, ...rest }) => {
	const [isOpen, setIsOpen] = useState(false)

	const onClick = () => {
		setIsOpen(!isOpen)
	}

	const isDevelopment = process.env.NODE_ENV === "development"

	return isDevelopment ? (
		<>
			<IconButton
				type="button"
				icon="code"
				title="Pokaż dane jako JSON"
				onClick={onClick}
				{...rest}
			/>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={() => setIsOpen(false)}
					render={() => <pre>{JSON.stringify(values, 0, 2)}</pre>}
				/>
			)}
		</>
	) : null
}

export default DisplayJSONButton
