import React from "react"

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null, eventId: null }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
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
