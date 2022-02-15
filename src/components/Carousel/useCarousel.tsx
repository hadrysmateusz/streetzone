import { useCallback, useMemo, useState } from "react"

const useCarousel = (
  nOfElements: number,
  onChangeIndex?: (index: number) => void
) => {
  const [current, setCurrent] = useState<number>(0)
  const lastIndex = nOfElements - 1

  const changeIndex = useCallback(
    (val) => {
      // wrap the index
      if (val < 0) {
        val = lastIndex
      } else {
        val = val % nOfElements
      }

      // trigger external handler
      if (onChangeIndex) {
        onChangeIndex(val)
      }

      // update internal value
      setCurrent(val)
    },
    [lastIndex, nOfElements, onChangeIndex]
  )

  const previous = useCallback(() => {
    changeIndex(current - 1)
  }, [changeIndex, current])

  const next = useCallback(() => {
    changeIndex(current + 1)
  }, [changeIndex, current])

  const hasLeft = current > 0
  const hasRight = current < lastIndex

  return useMemo(
    () => ({ hasLeft, hasRight, changeIndex, previous, next, current }),
    [changeIndex, current, hasLeft, hasRight, next, previous]
  )
}

export default useCarousel
