import React from "react"
import ReactBreakpoints from "react-breakpoints"

import { THEME } from "../constants"

export default (storyFn) => (
	<ReactBreakpoints breakpoints={{ ...THEME.breakpoints }}>{storyFn()}</ReactBreakpoints>
)
