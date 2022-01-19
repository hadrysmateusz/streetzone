import { useCallback } from "react"

import { useFlash } from "."

// TODO: make this more flexible
const useCopyToClipboard = () => {
	const flashMessage = useFlash()

	const copyToClipboard = useCallback(
		async (value, successDetails) => {
			if ("clipboard" in navigator) {
				try {
					await navigator.clipboard.writeText(value)
					flashMessage({
						type: "success",
						text: "Skopiowano do schowka",
						details: successDetails
					})
				} catch (err) {
					if ("permissions" in navigator) {
						await navigator.permissions.query({ name: "clipboard" })
					} else {
						flashMessage({
							type: "error",
							text: "Permission API isn't supported",
							details: `Skopiuj ręcznie: ${value}`
						})
					}
				}
			} else {
				flashMessage({
					type: "error",
					text: "Clipboard API isn't supported",
					details: `Skopiuj ręcznie: ${value}`
				})
			}
		},
		[flashMessage]
	)

	return copyToClipboard
}

export default useCopyToClipboard
