import React from "react"
import styles from "./CenteredLayout.module.scss"

const CenteredLayout = ({ children }) => {
	return <div className={styles.CenteredLayout}>{children}</div>
}

export default CenteredLayout
