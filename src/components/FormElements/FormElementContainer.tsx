import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

import { InfoContainer } from "./FormElementContainer.styles"

export const FormElementContainer: React.FC<{ info: string; error: string }> = ({
  info,
  error,
  children,
}) => (
  <div>
    {children}
    {(info || error) && (
      <InfoContainer hasError={!!error}>
        {error ? (
          <>
            <FontAwesomeIcon icon={faExclamationCircle} />
            &nbsp;<span>{error}</span>
          </>
        ) : (
          info && <span>{info}</span>
        )}
      </InfoContainer>
    )}
  </div>
)

export default FormElementContainer
