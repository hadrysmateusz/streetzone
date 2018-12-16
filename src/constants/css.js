import { keyframes } from "styled-components"

// Colors
export const COLOR_BLACK_DARKER = "#23282f"
export const COLOR_BLACK = "#272b33"
export const COLOR_BLACK_LIGHTER = "#2a2d37"

export const COLOR_DISABLED_DARKER = "#9b9b9b"
export const COLOR_DISABLED = "#acacac"
export const COLOR_DISABLED_LIGHTER = "#bbb"

export const COLOR_WHITE = "#fafafa"
export const COLOR_ACCENT = "rgb(65, 214, 165)"
export const COLOR_THUMBNAIL_BG = "#ededed"

// Keyframes
export const KEYFRAMES_SPIN = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`
