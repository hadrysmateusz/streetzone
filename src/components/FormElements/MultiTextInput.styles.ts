import CreatableSelect from "react-select/creatable"
import styled from "styled-components/macro"

import { ellipsis } from "../../style-utils"

import { disabledStyles, hoverStyles, focusStyles, basicStyles } from "./commonStyles"

export const StyledCreatableSelect = styled(CreatableSelect).attrs({
  classNamePrefix: "react-select",
})`
  .react-select__control {
    ${basicStyles}

    border-radius: 0;
    height: var(--form-element-height);

    &:not([disabled]) {
      :hover {
        ${hoverStyles}
      }
    }
  }
  .react-select__control--is-focused {
    ${focusStyles}
  }
  .react-select__control--is-disabled {
    ${disabledStyles}
  }
  .react-select__multi-value {
    ${ellipsis}
    max-width: 160px;
  }

  .react-select__value-container {
    padding: 0 var(--spacing2);
  }
`
