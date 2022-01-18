import { useState, useEffect } from "react"
import throttle from "lodash.throttle"

export const useScrollPosition = (limit = 200) => {
  const [value, setScroll] = useState(window.scrollY)

  const updateScroll = () => {
    setScroll(window.scrollY)
  }
  const throttledUpdateScroll = throttle(updateScroll, limit, { leading: true })

  useEffect(() => {
    window.addEventListener("scroll", throttledUpdateScroll)
    return () => window.removeEventListener("scroll", throttledUpdateScroll)
  }, [throttledUpdateScroll])

  return value
}

export default useScrollPosition
