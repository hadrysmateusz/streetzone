import React from "react"
import * as Sentry from "@sentry/browser"

class ErrorBoundary extends React.Component {
	state = { error: null, errorInfo: null, eventId: null }

	componentDidCatch(error, errorInfo) {
		this.setState({ error })

		// send errors to Sentry while in production
		if (process.env.NODE_ENV === "production") {
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo)
				const eventId = Sentry.captureException(error)
				this.setState({ eventId })
			})
		}
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
