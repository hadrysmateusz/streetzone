import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ShareButton = ({ fullUrl, onClick, variant, icon, tooltip }) => (
  <a
    href={fullUrl}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    variant={variant}
    title={tooltip}
  >
    <FontAwesomeIcon icon={icon} />
  </a>
)

export default ShareButton
