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
	...props
}) => {
	let classNames = cn({
		[styles.base]: true,
		[styles.regular]: !primary && !disabled,
		[styles.primary]: primary,
		[styles.disabled]: disabled
	})

	if (text && children) {
		throw new Error(
			"The button component can take either children or the text prop, not both"
		)
	}
	return (
		<button className={classNames} type={type} disabled={disabled} {...props}>
			{children || text}
		</button>
	)
}

Button.propTypes = {
	disabled: PropTypes.bool,
	primary: PropTypes.bool
}

export default Button
