import React from "react"
import * as Sentry from "@sentry/browser"
import Button from "../Button"

class ErrorBoundary extends React.Component {
	state = { error: null, errorInfo: null, eventId: null }

	componentDidCatch(error, errorInfo) {
		this.setState({ error })
		Sentry.withScope((scope) => {
			scope.setExtras(errorInfo)
			const eventId = Sentry.captureException(error)
			this.setState({ eventId })
		})
	}

	render() {
		const { error, errorInfo } = this.state
		const { ErrorComponent } = this.props
		return error ? (
			<>
				<ErrorComponent error={error} errorInfo={errorInfo} />
				<Button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>
					Report feedback
				</Button>
			</>
		) : (
			this.props.children
		)
	}
}

export default ErrorBoundary
