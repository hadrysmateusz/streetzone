import { useCallback, useMemo, useState } from "react";

const useContentToggle = (initialState: boolean) => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState)

  const onClick = useCallback(() => {
    setIsToggled(!isToggled)
  }, [isToggled])

  const getToggleProps = useCallback(() => {
    return {
      onClick,
      isToggled,
      style: { cursor: "pointer" },
    }
  }, [isToggled, onClick])

  const getContentProps = useCallback(() => {
    return {
      hidden: !isToggled,
    }
  }, [isToggled])

  return useMemo(
    () => ({ getContentProps, getToggleProps, isToggled }),
    [getContentProps, getToggleProps, isToggled]
  )
}

export default useContentToggle
