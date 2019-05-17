import {
	connectRefinementList,
	connectMenu,
	connectRange,
	connectToggleRefinement,
	connectSortBy
} from "react-instantsearch-dom"

export const VirtualRefinementList = connectRefinementList(() => null)
export const VirtualMenu = connectMenu(() => null)
export const VirtualRange = connectRange(() => null)
export const VirtualToggle = connectToggleRefinement(() => null)
export const VirtualSortBy = connectSortBy(() => null)
