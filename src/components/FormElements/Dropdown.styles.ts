import CreatableSelect from "react-select/creatable";
import styled from "styled-components/macro";

import { basicStyles, BasicStylesProps, disabledStyles, focusStyles, hoverStyles } from "./Common.styles";

// TODO: proper types (maybe use dropdown component from writing-tool to simplify the types
export const StyledCreatableSelect = styled(CreatableSelect).attrs<{
  [key: string]: any
}>({
  classNamePrefix: "react-select",
})<{ [key: string]: any }>`
  .react-select__control {
    // TODO: proper types (maybe use dropdown component from writing-tool to simplify the types
    ${(p: any) => basicStyles(p)}

    border-radius: 0;
    height: var(--form-element-height);

    &:not([disabled]) {
      :hover {
        ${hoverStyles}
      }
    }
  }

  .react-select__control--menu-is-open,
  .react-select__control--is-focused {
    ${focusStyles}
  }

  .react-select__control--is-disabled {
    ${disabledStyles}
  }

  .react-select__value-container {
    padding: 0 var(--spacing2);
    overflow: visible;
  }

  .react-select__menu {
    border-radius: 0;
    z-index: 80;
  }

  .react-select__option {
    &:active {
      background: var(--black0);
      color: white;
    }
  }

  .react-select__option--is-selected {
    background: var(--gray100);
    color: black;
  }

  .react-select__option--is-focused {
    background: var(--black25);
    color: white;
  }
`

export const CreatableSelectStylesWrapper = styled.div<BasicStylesProps>`
  .react-select__control {
    ${(p) => basicStyles(p)}

    border-radius: 0;
    height: var(--form-element-height);

    &:not([disabled]) {
      :hover {
        ${hoverStyles}
      }
    }
  }

  .react-select__control--menu-is-open,
  .react-select__control--is-focused {
    ${focusStyles}
  }

  .react-select__control--is-disabled {
    ${disabledStyles}
  }

  .react-select__value-container {
    padding: 0 var(--spacing2);
    overflow: visible;
  }

  .react-select__menu {
    border-radius: 0;
    z-index: 80;
  }

  .react-select__option {
    &:active {
      background: var(--black0);
      color: white;
    }
  }

  .react-select__option--is-selected {
    background: var(--gray100);
    color: black;
  }

  .react-select__option--is-focused {
    background: var(--black25);
    color: white;
  }
`
