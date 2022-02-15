import React from "react"
import styled from "styled-components/macro"
// import PropTypes from "prop-types"

import { arrayPad } from "../../utils"

const DefaultPlaceholder = styled.div`
  background: var(--almost-white);
`

/**
 * This is not a skeleton-loading component, it is only for fixed length (of children) components,
 * where missing elements should be replaced by a placeholder
 */
const PlaceholderWrapper = ({
  children,
  placeholder: PlaceholderComponent = DefaultPlaceholder,
  placeholderProps = {},
  count,
}) => {
  const childrenArray = React.Children.toArray(children)

  return arrayPad(childrenArray, count, null).map((child, i) =>
    child === null ? <PlaceholderComponent key={`placeholder-${i}`} /> : child
  )
}

// PlaceholderWrapper.propTypes = {
// 	placeholder: PropTypes.component,
// 	placeholderProps: PropTypes.object,
// 	count: PropTypes.number.required
// }

export default PlaceholderWrapper
