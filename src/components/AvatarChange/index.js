import React from "react"
import { FileHandler } from "../FileHandler"

import styles from "./AvatarChange.module.scss"

const AvatarChangeForm = (props) => {
	return (
		<div>
			<div
				className={styles.avatarPreview}
				style={{ backgroundImage: `url(${props.avatarURL})` }}
			/>
			{/* <FileHandler /> */}
		</div>
	)
}

export default AvatarChangeForm
