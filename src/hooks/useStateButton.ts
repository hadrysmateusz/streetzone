import { useState, useEffect, useCallback, useMemo } from "react"

/**
 * Provides a state value that will change back as soon as it is changed
 * Useful for components which use boolean props to trigger some action
 * @param {boolean} defaultState the state the hook will return while inactive
 */
const useStateButton = (
  defaultState: boolean = false
): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(defaultState)

  const trigger = useCallback(() => {
    setState(true)
  }, [])

  useEffect(() => {
    setState(false)
  }, [state])

  return useMemo(() => [state, trigger], [state, trigger])
}

export default useStateButton
