import React from "react"

export const withProps = (addedProps) => (Component) => (props) => (
	<Component {...props} {...addedProps} />
)
