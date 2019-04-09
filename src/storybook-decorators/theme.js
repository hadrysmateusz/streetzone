import React from "react"
import { ThemeProvider } from "styled-components/macro"
import { THEME } from "../constants"

export default (storyFn) => <ThemeProvider theme={THEME}>{storyFn()}</ThemeProvider>
