import {
	connectRefinementList,
	connectMenu,
	connectRange,
	connectToggleRefinement,
	connectSortBy
} from "react-instantsearch-dom"

import { withProps } from "../../HOCs"

export const VirtualRange = withProps({
	min: 0,
	max: Number.MAX_SAFE_INTEGER
})(
	connectRange((props) => {
		return null
	})
)

export const VirtualRefinementList = connectRefinementList(() => null)
export const VirtualMenu = connectMenu(() => null)
// export const VirtualRange = connectRange(() => null)
export const VirtualToggle = connectToggleRefinement(() => null)
export const VirtualSortBy = connectSortBy(() => null)
