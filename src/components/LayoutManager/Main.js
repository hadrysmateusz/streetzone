import { useContext } from "react"
import styled from "styled-components/macro"

import LayoutContext from "./LayoutContext"

const MainContainer = styled.div`
  align-self: start;
  flex: 1;
`

const Main = ({ children }) => {
  const layoutContext = useContext(LayoutContext)

  if (!layoutContext) {
    console.error("You shouldn't use <Main> outside of <LayoutManager>")
  }

  return <MainContainer ref={layoutContext.mainRef}>{children}</MainContainer>
}

export default Main
