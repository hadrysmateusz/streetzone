import React from "react"

class ErrorBoundary extends React.Component {
	state = { error: null, errorInfo: null }

	componentDidCatch(error, errorInfo) {
		// TODO: log the error to an error reporting service

		this.setState({ error, errorInfo })
	}

	render() {
		const { error, errorInfo } = this.state
		const { ErrorComponent } = this.props
		return error ? (
			<ErrorComponent error={error} errorInfo={errorInfo} />
		) : (
			this.props.children
		)
	}
}

export default ErrorBoundary
