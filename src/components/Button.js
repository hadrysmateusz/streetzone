import React from "react"
import styles from "./Button.module.scss"
import PropTypes from "prop-types"
import cn from "classnames"

const Button = ({ disabled = false, children, primary, ...props }) => {
	let classNames = cn({
		[styles.base]: true,
		[styles.regular]: !primary && !disabled,
		[styles.primary]: primary,
		[styles.disabled]: disabled
	})
	return (
		<button className={classNames} disabled={disabled} {...props}>
			{children}
		</button>
	)
}

Button.propTypes = {
	disabled: PropTypes.bool,
	primary: PropTypes.bool
}

export default Button
