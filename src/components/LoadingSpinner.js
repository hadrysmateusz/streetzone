import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./LoadingSpinner.module.scss"
import animations from "../scss/animations.module.scss"

export default function LoadingSpinner() {
	return (
		<div className={styles.LoadingSpinner}>
			<FontAwesomeIcon icon="spinner" className={animations.spinning} />
		</div>
	)
}
