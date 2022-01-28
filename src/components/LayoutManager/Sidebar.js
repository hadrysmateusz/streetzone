import { useEffect, useContext, useCallback } from "react"
import throttle from "lodash/throttle"

import { getHeightDifference } from "./helpers"
import useLoadableElements from "./useLoadableElements"
import LayoutContext from "./LayoutContext"
import { SidebarContainer, SidebarHeader, SidebarSectionContainer } from "./Sidebar.styles"

const SidebarSection = ({ title, children }) => (
  <SidebarSectionContainer>
    <SidebarHeader>{title}</SidebarHeader>
    <div>{children}</div>
  </SidebarSectionContainer>
)

const Sidebar = ({ children, availableElements, isRandom }) => {
  const layoutContext = useContext(LayoutContext)
  if (!layoutContext) {
    console.error("You shouldn't use <Sidebar> outside of <LayoutManager>")
  }
  const { sidebarRef, mainRef, isMobile } = layoutContext

  const { elements, loadMore } = useLoadableElements(availableElements, { isRandom })

  // TODO: this value might get stale if the window is resized
  const sectionHeight = window.innerHeight

  const update = useCallback(() => {
    const difference = getHeightDifference(mainRef, sidebarRef)
    if (difference > sectionHeight) {
      loadMore()
    }
  }, [loadMore, mainRef, sectionHeight, sidebarRef])

  useEffect(() => {
    // create cleanup function
    const unregister = () => window.removeEventListener("scroll", throttledUpdate)

    // don't listen on mobile
    if (isMobile) return unregister

    // create throttled version of update function
    const throttleInterval = 200
    const throttledUpdate = throttle(update, throttleInterval, { leading: true })

    // register onScroll listener
    window.addEventListener("scroll", throttledUpdate)

    return unregister
  }, [isMobile, update])

  return isMobile ? null : (
    <SidebarContainer ref={sidebarRef}>
      <div>{children}</div>
      {elements.map(({ title, component: C }, i) => (
        <SidebarSection title={title} key={i}>
          <C />
        </SidebarSection>
      ))}
    </SidebarContainer>
  )
}

export default Sidebar
