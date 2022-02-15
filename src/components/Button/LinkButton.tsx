import React from "react"
import { Link } from "react-router-dom"
import { Button, ButtonProps } from "./Button"

type LinkProps =
  | { to: string; href?: undefined }
  | { to?: undefined; href: string }
type LinkButtonProps = LinkProps &
  Omit<ButtonProps, "type" | "onClick"> & {
    // Override type of onClick to change MouseEvent target element
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
  }

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  href,
  ...rest
}) => {
  return <Button as={href ? "a" : Link} to={to} href={href} {...rest} />
}
