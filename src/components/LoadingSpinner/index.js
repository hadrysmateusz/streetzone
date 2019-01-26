import React from "react"
import { RotateSpinLoader } from "react-css-loaders"

import EmptyState from "../EmptyState"

const LoadingSpinner = () => <RotateSpinLoader size={9} />

const LoadableComponentSpinner = ({ error, pastDelay, timedOut }) => {
	if (error) {
		return (
			<EmptyState src="SadFace.png">
				Coś poszło nie tak, odśwież stronę lub spróbuj później
			</EmptyState>
		)
	} else if (timedOut) {
		return (
			<EmptyState src="SadFace.png">
				Serwer długo nie odpowiada, odśwież stronę lub spróbuj później
			</EmptyState>
		)
	} else if (pastDelay) {
		return <LoadingSpinner />
	} else {
		return null
	}
}

export default LoadingSpinner
export { LoadableComponentSpinner }
