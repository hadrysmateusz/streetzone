import { useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connectSortBy } from "react-instantsearch-dom"
import { Media } from "react-breakpoints"

import Dropdown from "../FormElements/Dropdown"

import { Container, StyledSelect } from "./AlgoliaSortBy.styles"

const AlgoliaSortBy = ({
  items,
  defaultRefinement,
  placeholder,

  refine,
  currentRefinement,
  ...rest
}) => {
  const onChangeDesktop = useCallback((data, _action) => refine(data.value), [refine])
  const onChangeMobile = useCallback((e) => refine(e.currentTarget.value), [refine])

  return (
    <Media>
      {({ currentBreakpoint }) =>
        currentBreakpoint > 0 ? (
          <Dropdown
            {...rest}
            options={items}
            defaultValue={defaultRefinement}
            onChange={onChangeDesktop}
            isSearchable={false}
          />
        ) : (
          <Container {...rest}>
            <label htmlFor="filter-select">
              <FontAwesomeIcon icon="sort" />
              Sortuj
            </label>
            <StyledSelect id="filter-select" onChange={onChangeMobile}>
              {items.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </StyledSelect>
          </Container>
        )
      }
    </Media>
  )
}

export default connectSortBy(AlgoliaSortBy)
