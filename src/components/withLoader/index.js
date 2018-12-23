import React from "react"
import LoadingSpinner from "../LoadingSpinner"

const withLoader = (C) => (props) => {
	return !props.isLoading ? <C {...props} /> : <LoadingSpinner />
}

export default withLoader
