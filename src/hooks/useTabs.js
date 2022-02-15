import cloneDeep from "clone-deep"
import { useState } from "react"

export const useTabs = (tabs, defaultTab) => {
  const _tabs = Object.freeze(cloneDeep(tabs))

  const [openTab, setOpenTab] = useState(_tabs[defaultTab].id)

  const switchTab = (tabId) => setOpenTab(_tabs[tabId])

  return [openTab, switchTab, _tabs]
}

export default useTabs
