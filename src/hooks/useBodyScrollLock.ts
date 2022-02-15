import React, { useLayoutEffect, useRef } from "react"
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock"

/**
 * Provides controllable body scroll locking
 * @param {boolean} isActive whether scroll should be locked, setting this to a fixed true value will disable scrolling whenever the component is rendered
 * @param passedInRef scrollableRef is by default created and managed internally, but this can be used to override that with a ref from outside
 */
export const useBodyScrollLock = <E extends HTMLElement = HTMLDivElement>(
  isActive: boolean,
  passedInRef?: React.MutableRefObject<E | null>
) => {
  const scrollableRef = useRef<E>(null)

  const ref = passedInRef ?? scrollableRef

  useLayoutEffect(() => {
    if (!ref.current) {
      clearAllBodyScrollLocks()
      return
    }

    if (isActive) {
      disableBodyScroll(ref.current)
    } else {
      enableBodyScroll(ref.current)
    }

    return clearAllBodyScrollLocks
  }, [isActive, ref])

  return { scrollableRef: ref }
}

export default useBodyScrollLock
