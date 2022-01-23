import { useState, useEffect } from "react"

/**
 * Provides a state value that will change back as soon as it is changed
 * Useful for components which use boolean props to trigger some action
 * @param {boolean} defaultState the state the hook will return while inactive
 */
const useStateButton = (defaultState = false) => {
  const [state, setState] = useState(defaultState)
  const trigger = () => {
    setState(true)
  }

  useEffect(() => {
    setState(false)
  }, [state])

  return [state, trigger]
}

export default useStateButton
