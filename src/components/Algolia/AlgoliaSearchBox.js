import { useState, useEffect, useRef } from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { withRouter } from "react-router-dom"
import { compose } from "recompose"
import { withBreakpoints } from "react-breakpoints"

import { decodeURL } from "../../utils/algoliaURLutils"

import { Input } from "../FormElements"

import { PoweredBy } from "./PoweredBy"

// TODO: add a small loading indicator
// TODO: add a clear button

const AlgoliaSearchBox = ({
  location,
  refine,
  currentBreakpoint,
  placeholderLong,
  placeholder,
  debounce = 900,
}) => {
  const [value, setValue] = useState("")
  const inputRef = useRef()
  const timeoutRef = useRef(null)

  useEffect(() => {
    try {
      const parsedSearch = decodeURL(location.search)

      // if there was a problem with parsing or query wasn't present default to empty string
      const query = parsedSearch && parsedSearch.query ? parsedSearch.query : ""

      setValue(query)
    } catch (error) {
      setValue("")
      throw error
    }
  }, [location])

  const onChange = () => {
    // reset the timeout (debouncing)
    // don't write the value to a variable, the ref is required
    clearTimeout(timeoutRef.current)

    // update internal value
    setValue(inputRef.current.value)

    // set the timeout (debouncing)
    timeoutRef.current = setTimeout(() => {
      // update the algolia search state
      refine(inputRef.current.value)
      // remove the timeout (can be used to create a loading state indicator)
      timeoutRef.current = null
    }, debounce)
  }

  // const onClear = () => {
  //   setValue("")
  //   refine()
  // }

  const placeholderText = currentBreakpoint > 0 ? placeholderLong || placeholder : placeholder

  return (
    <Input
      icon="search"
      value={value}
      placeholder={placeholderText}
      onChange={onChange}
      ref={inputRef}
      rightSlot={<PoweredBy small />}
      rightSlotWidth="100px"
    />
  )
}

export default compose(withRouter, connectSearchBox, withBreakpoints)(AlgoliaSearchBox)
