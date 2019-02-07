import React from "react"
import { RotateSpinLoader } from "react-css-loaders"

import EmptyState from "../EmptyState"

class LoadingSpinner extends React.Component {
	state = { isVisible: false }

	componentDidMount() {
		this.showAfterId = setTimeout(
			() => this.setState({ isVisible: true }),
			this.props.delay || 200
		)
	}
	componentWillUnmount() {
		clearTimeout(this.showAfterId)
	}
	render() {
		return this.state.isVisible ? <RotateSpinLoader size={9} /> : null
	}
}

const LoadableComponentSpinner = ({ error, pastDelay, timedOut }) => {
	if (error) {
		console.log(error)
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
