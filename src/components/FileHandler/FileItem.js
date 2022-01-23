import Ratio from "react-ratio"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import PropTypes from "prop-types"

import { TextBlock } from "../StyledComponents"

import { IconContainer, ErrorContainer, Overlay } from "./common"
import { IndicatorIcon, IndicatorsContainer, Thumbnail } from "./FileItem.styles"

const PureFileItem = ({ id, previewUrl, error, actions, isMain = false, uploadProgress }) => {
  const hasError = !!error

  return (
    <Ratio ratio={6 / 7}>
      <Thumbnail hasError={hasError}>
        <IndicatorsContainer>
          {hasError && (
            <IndicatorIcon color="var(--danger50)" title={error} icon="exclamation-circle" />
          )}
          {isMain && <IndicatorIcon color="var(--accent50)" icon="star" />}
        </IndicatorsContainer>
        {previewUrl ? (
          <img src={previewUrl} alt="" />
        ) : uploadProgress ? (
          uploadProgress + "%"
        ) : null}
        <Overlay>
          {actions.map((action) => (
            <IconContainer key={action.label} onClick={() => action.handler(id)}>
              <FontAwesomeIcon icon={action.icon} size="2x" fixedWidth />
              <TextBlock centered>{action.label}</TextBlock>
            </IconContainer>
          ))}
        </Overlay>
        {hasError && <ErrorContainer>{error}</ErrorContainer>}
      </Thumbnail>
    </Ratio>
  )
}

// PureFileItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   previewUrl: PropTypes.string.isRequired,
//   isMain: PropTypes.bool,
//   error: PropTypes.string,
//   actions: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string,
//       handler: PropTypes.func.isRequired,
//       icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
//     })
//   ),
// }

export default PureFileItem
