import { useCallback } from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"

import { ClearButton } from "./StyledComponents"

export const Clear = connectCurrentRefinements(({ items, refine, attribute }) => {
  const onClick = useCallback(
    (e) => {
      e.stopPropagation()
      const itemToClear = items.find((item) => item.attribute === attribute)
      refine(itemToClear.value)
    },
    [attribute, items, refine]
  )

  return <ClearButton onClick={onClick}>Wyczyść</ClearButton>
})

export const ClearRange = connectCurrentRefinements(({ items, refine, attribute, resetState }) => {
  const onClick = useCallback(
    (e) => {
      e.stopPropagation()
      const itemToClear = items.find((item) => item.attribute === attribute)
      if (itemToClear) {
        refine(itemToClear.value)
      }
      // resetting state happens separately to clear the value even if it is invalid
      resetState()
    },
    [attribute, items, refine, resetState]
  )

  return <ClearButton onClick={onClick}>Wyczyść</ClearButton>
})
