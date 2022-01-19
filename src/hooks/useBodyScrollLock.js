import { useLayoutEffect, useRef } from "react"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

/**
 * Provides controllable body scroll locking
 * @param {boolean} isActive whether scroll should be locked, setting this to a fixed true value will disable scrolling whenever the component is rendered
 */
const useBodyScrollLock = (isActive) => {
  const scrollableRef = useRef()

  useLayoutEffect(() => {
    if (isActive) {
      disableBodyScroll(scrollableRef.current)
    } else {
      enableBodyScroll(scrollableRef.current)
    }

    return clearAllBodyScrollLocks
  }, [isActive])

  return { scrollableRef }
}

export default useBodyScrollLock
