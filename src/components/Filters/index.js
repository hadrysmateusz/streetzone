import React, { forwardRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { withBreakpoints } from "react-breakpoints"
import { compose } from "recompose"

import { Button, ButtonContainer } from "../Button"
import { TextBlock } from "../StyledComponents"

import { useTabs } from "../../hooks"
import { withProps } from "../../HOCs"

import {
	FiltersContainer,
	FilterInnerContainer,
	CloseIconContainer,
	Section,
	ActionsContainer,
	MobileFiltersHeader
} from "./StyledComponents"
import ClearAllFiltersButton from "./ClearAllFiltersButton"

const FiltersBase = forwardRef((props, ref) => {
	const { tabOptions, defaultTab, toggle, clear, currentBreakpoint, children } = props
	const [openTab, switchTab, tabs] = useTabs(tabOptions, defaultTab)

	const isMobile = +currentBreakpoint < 1

	return (
		<FiltersContainer ref={ref}>
			<FilterInnerContainer>
				{isMobile && (
					<MobileFiltersHeader>
						<TextBlock size="m" bold>
							Filtry
						</TextBlock>
						<CloseIconContainer onClick={toggle}>
							<FontAwesomeIcon icon="times" />
						</CloseIconContainer>
					</MobileFiltersHeader>
				)}

				{children({ openTab, switchTab, tabs, isMobile })}
			</FilterInnerContainer>

			{isMobile && (
				<ActionsContainer>
					<ButtonContainer noMargin>
						<Button onClick={toggle} fullWidth primary>
							Gotowe
						</Button>
						<ClearAllFiltersButton onClick={clear.update} fullWidth />
					</ButtonContainer>
				</ActionsContainer>
			)}
		</FiltersContainer>
	)
})

export { Section }

// using withProps because for whatever reason withBreakpoints alone doesn't work
export default compose(
	withBreakpoints,
	withProps()
)(FiltersBase)
