import { Link } from "react-router-dom"

import { ROUTES } from "../../constants"

import { ReactComponent as LogoBig } from "./logo-big.svg"
import { LogoContainer } from "./Logo.styles"

export const Logo: React.FC<{ centered?: boolean }> = ({ centered = false }) => (
  <Link to={ROUTES.HOME}>
    <LogoContainer centered={centered}>
      <LogoBig />
    </LogoContainer>
  </Link>
)

export default Logo
