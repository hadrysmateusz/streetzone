import React, { useRef } from "react"
import { withBreakpoints } from "react-breakpoints"
import styled from "styled-components/macro"

import LayoutContext from "./LayoutContext"

const Layout = styled.div`
	@media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
		> :first-child {
			margin-right: var(--spacing3);
		}

		display: flex;
		gap: var(--spacing3);
	}
`

const LayoutManager = withBreakpoints(({ currentBreakpoint, children }) => {
	const mainRef = useRef()
	const sidebarRef = useRef()
	const isMobile = +currentBreakpoint <= 1

	const contextValue = {
		mainRef,
		sidebarRef,
		isMobile
	}

	return (
		<LayoutContext.Provider value={contextValue}>
			<Layout>{children}</Layout>
		</LayoutContext.Provider>
	)
})

export default LayoutManager
