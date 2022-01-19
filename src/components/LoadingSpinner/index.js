import React from "react"
// import { BarLoader } from "react-css-loaders"
// import PropTypes from "prop-types"
import styled from "styled-components/macro"

import { LoaderButton } from "../Button"
import EmptyState from "../EmptyState"
import { useNewDelayRender } from "../../hooks/useDelayRender"

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(p) => p.size * 30}px;
  max-height: 100%;
`

const FullPageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

export const FullPageSpinner = ({ delay = 350 }) => {
  return useNewDelayRender(
    <FullPageOverlay>
      <LoadingSpinner delay={0} color={"white"} />
    </FullPageOverlay>,
    delay
  )
}

const LoadingSpinner = ({ size = 9, color = "#cfcfcf", delay = 200 }) => {
  return useNewDelayRender(
    <SpinnerContainer size={size}>
      {/* <BarLoader size={size} color={color || "#cfcfcf"} /> */}
      Loading
    </SpinnerContainer>,
    delay
  )
}

// LoadingSpinner.propTypes = {
//   size: PropTypes.number,
//   color: PropTypes.string,
//   delay: PropTypes.number,
// }

const LoadableComponentSpinner = ({ error, pastDelay, timedOut }) => {
  if (error) {
    console.error(error)
    return <EmptyState header="Coś poszło nie tak">Odśwież stronę lub spróbuj później</EmptyState>
  } else if (timedOut) {
    return (
      <EmptyState header="Serwer długo nie odpowiada">
        Odśwież stronę lub spróbuj później
      </EmptyState>
    )
  } else if (pastDelay) {
    return <FullPageSpinner />
  } else {
    return null
  }
}

const InfiniteLoadingSpinner = ({ delay = 350, loadMore, isLoading, showSpinner = true }) => {
  return useNewDelayRender(
    <div>
      {showSpinner && <LoadingSpinner delay={0} />}
      <LoaderButton
        isLoading={isLoading}
        fullWidth
        big
        onClick={loadMore}
        text="Załaduj więcej"
        loadingText="Ładowanie"
      />
    </div>,
    delay
  )
}

export default LoadingSpinner
export { LoadableComponentSpinner, InfiniteLoadingSpinner }
