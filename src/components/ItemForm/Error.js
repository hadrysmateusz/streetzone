import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Error.module.scss"

export default function Error({ meta }) {
	return (
		<div className={styles.mainErrorContainer}>
			{meta.error && meta.touched && (
				<span>
					<FontAwesomeIcon icon="exclamation" />
					<span className={styles.mainErrorText}>{meta.error}</span>
				</span>
			)}
		</div>
	)
}
