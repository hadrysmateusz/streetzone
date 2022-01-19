import React from "react"
import { ThemeProvider } from "styled-components/macro"
import breakpoints from "../constants/breakpoints"

export default (storyFn) => (
	<ThemeProvider theme={{ breakpoints }}>{storyFn()}</ThemeProvider>
)
