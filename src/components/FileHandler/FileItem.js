import React, { Component } from "react"
import cn from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./FileItem.module.scss"

export class FileItem extends Component {
	render() {
		let classNames = cn({
			[styles.base]: true,
			[styles.error]: this.props.error
		})

		return (
			<div className={classNames} key={this.props.fileItem.id}>
				<div className={styles.thumbnail}>
					<img src={this.props.fileItem.previewUrl} alt="" />
				</div>
				<button
					className={styles.removeButton}
					type="button"
					title="Usuń zdjęcie"
					onClick={() => this.props.onDelete(this.props.fileItem.id)}
				>
					<FontAwesomeIcon icon="times" />
				</button>
				{this.props.error && (
					<button
						className={styles.problemButton}
						type="button"
						title={this.props.error}
					>
						<FontAwesomeIcon icon="exclamation" />
					</button>
				)}
			</div>
		)
	}
}

export default FileItem
