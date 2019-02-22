import React from "react"
import ErrorBoundary from "./ErrorBoundary"

const withErrorBoundary = (ErrorComponent) => (C) => (props) => (
	<ErrorBoundary ErrorComponent={ErrorComponent}>
		<C {...props} />
	</ErrorBoundary>
)

export default withErrorBoundary
