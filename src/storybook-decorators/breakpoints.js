import React from "react"
import ReactBreakpoints from "react-breakpoints"

import breakpoints from "../constants/breakpoints"

export default (storyFn) => (
	<ReactBreakpoints breakpoints={{ ...breakpoints }}>{storyFn()}</ReactBreakpoints>
)
