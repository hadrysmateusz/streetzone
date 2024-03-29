import styled from "styled-components/macro"

import { resetButtonStyles, ellipsis } from "../../style-utils"

export const BoxItem = styled.div`
  border: 1px solid ${(p) => (p.checked ? "black" : "var(--gray75)")};
  font-size: var(--font-size--xs);
  height: 100%;
  transform: border 0.2s ease;
  :hover {
    border-color: var(--black25);
  }

  transition-property: border-color;
  transition-duration: 0.15s;
  transition-timing-function: ease;

  ${(p) => p.checked && `color: white; background: black;`}
  label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const NoResults = styled.div`
  text-align: center;
  margin: var(--spacing2) 0;
`

export const OptionsContainer = styled.div`
  display: grid;
  max-width: 100%;
  gap: var(--spacing1);
  ${(p) => p.multiColumn && `grid-template-columns: repeat(2, 1fr);`}
  ${(p) =>
    p.boxGrid &&
    "grid-template-columns: repeat(auto-fill, minmax(35px,1fr)); gap: var(--spacing2); margin: var(--spacing2) 0;"};
`

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;

  * {
    cursor: pointer;
  }

  span {
    padding-left: var(--spacing2);
  }

  label {
    color: var(--black75);
    cursor: pointer;
    width: 100%;
    ${ellipsis}
  }
`

export const RangeContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: var(--form-element-height);
  display: grid;
  gap: var(--spacing2);
  grid-template-columns: 1fr 1fr;
`

export const ClearButton = styled.button`
  ${resetButtonStyles}
  color: var(--danger50);
  font-weight: var(--semi-bold);
  font-size: var(--font-size--xs);
  margin: 0 var(--spacing1);
  padding-left: 3px;
`

export const SizeCategoriesContainer = styled.div`
  display: grid;
  gap: var(--spacing1);
  margin: var(--spacing1) 0 var(--spacing1) var(--spacing1);
`

export const EmptyStateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray25);
`

// export const SearchBox = styled.div`
//   width: 100%;
//   height: var(--form-element-height);
//   flex: 1;
//   border: 1px solid var(--gray75);
//   :hover {
//     border: 1px solid var(--gray25);
//   }
//   display: flex;
//   color: var(--black75);

//   .icon-container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 34px;
//   }

//   input {
//     border: none;
//     flex: 1;
//     background: white;
//     min-width: 0;
//     width: 100%;
//     padding: 0 var(--spacing1);
//   }
// `

// export const ItemsLoaderContainer = styled.div`
//   text-align: center;
// `

// export const InfiniteOwnerCardsContainer = styled.div`
//   display: grid;
//   gap: var(--spacing2);
//   @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
//     gap: var(--spacing3);
//   }
// `

// export const ResultsContainer = styled.main`
//   grid-area: content;
//   flex: 1;
//   max-width: 1080px;
//   margin: 0 auto;
// `
