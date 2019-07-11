import React from "react"
import * as Sentry from "@sentry/browser"
import { withAuthentication } from "../UserSession"

class ErrorBoundary extends React.Component {
	state = { error: null, errorInfo: null, eventId: null }

	componentDidCatch(error, errorInfo) {
		this.setState({ error })
		const { authUser } = this.props

		// prevent double errors because of dev rethrow
		if (process.env.NODE_ENV === "production") {
			// report to sentry
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo)
				if (authUser) {
					scope.setUser({
						id: authUser.uid,
						email: authUser.email,
						username: authUser.name
					})
				}
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

export default withAuthentication(ErrorBoundary)
