import React, { Component } from "react"
import cn from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./FileItem.module.scss"

// .base {
// 	user-select: none;
// 	border: $border-width-main solid $black;
// 	margin-right: 10px;
// 	margin-bottom: 10px;
// 	height: 140px;
// 	width: 140px;
// 	flex-grow: 0;
// 	flex-shrink: 0;
// 	position: relative;
// }
// .error {
// 	border: 4px solid rgb(216, 16, 16);
// }

// .removeButton {
// 	outline: none;
// 	transition: all 0.2s;
// 	position: absolute;
// 	height: 34px;
// 	width: 34px;
// 	top: 7px;
// 	right: 7px;
// 	border-radius: 50%;
// 	background: #171b23aa;
// 	color: #eee;
// 	border: none;
// 	&:hover {
// 		transform: scale(1.08);
// 		background: #171b23e6;

// 	}
// }

// .problemButton {
// 	outline: none;
// 	position: absolute;
// 	height: 34px;
// 	width: 34px;
// 	top: 47px;
// 	right: 7px;
// 	border-radius: 50%;
// 	background: rgba(202, 10, 10, 0.65);
// 	color: #eee;
// 	border: none;
// 	&:hover {
// 		background: rgb(226, 9, 9);
// 	}
// }

// .innerContainer {
// 	display: flex;
// 	justify-content: space-between;
// 	font-size: 0.91rem;
// 	font-weight: bold;
// }

// .price {
// 	color: $primary;
// }

// .thumbnail {
// 	background: $thumbnail-bg;
// 	display: flex;
// 	height: 100%;
// 	justify-content: center;
// 	align-items: center;

// 	img {
// 		max-height: 100%;
// 		max-width: 100%;
// 	}
// }
// .info {
// 	padding: 0 8px;
// 	flex-grow: 0;
// }

// .designers {
// 	text-transform: uppercase;
// 	margin-bottom: 4px;
// 	padding-right: 10px;
// 	white-space: nowrap;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// }
// .name {
// 	color: #333;
// 	font-size: 0.91rem;
// 	white-space: nowrap;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// }
// .date {
// 	color: #777;
// 	font-size: 0.88rem;
// 	padding: 10px 7px 11px;
// 	margin-top: 10px;
// 	border-top: 1px solid #bbb;
// 	white-space: nowrap;
// 	overflow: hidden;
// 	text-overflow: ellipsis;
// }
// .topContainer {
// 	padding: 14px 7px 0;
// }

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
					<button className={styles.problemButton} type="button" title={this.props.error}>
						<FontAwesomeIcon icon="exclamation" />
					</button>
				)}
			</div>
		)
	}
}

export default FileItem
