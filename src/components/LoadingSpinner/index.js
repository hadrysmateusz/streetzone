import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./LoadingSpinner.module.scss"
import animations from "../../scss/animations.module.scss"
import cn from "classnames"

export default function LoadingSpinner({ inline = false }) {
	let classNames = cn({
		[styles.base]: true,
		[styles.block]: !inline,
		[styles.inline]: inline
	})

	return (
		<div className={classNames}>
			<FontAwesomeIcon icon="spinner" className={animations.spinning} />
		</div>
	)
}
