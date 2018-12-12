import React from "react"
import styles from "./Button.module.scss"
import PropTypes from "prop-types"
import cn from "classnames"

const Button = ({
	disabled = false,
	type = "button",
	children,
	text,
	primary,
	wide,
	theme,
	...props
}) => {
	let classNames = cn({
		[styles.base]: true,
		[styles.regular]: !primary && !disabled,
		[styles.primary]: primary,
		[styles.disabled]: disabled,
		[styles.wide]: wide
	})

	const style = theme
		? {
				color: theme.color,
				backgroundColor: theme.backgroundColor,
				borderColor: theme.borderColor
		  }
		: {}

	if (text && children) {
		throw new Error(
			"The button component can take either children or the text prop, not both"
		)
	}
	return (
		<button
			className={classNames}
			style={style}
			type={type}
			disabled={disabled}
			{...props}
		>
			{children || text}
		</button>
	)
}

Button.propTypes = {
	disabled: PropTypes.bool,
	primary: PropTypes.bool
}

export default Button
