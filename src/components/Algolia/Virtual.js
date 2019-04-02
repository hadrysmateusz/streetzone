import { connectRefinementList, connectMenu, connectRange } from "react-instantsearch-dom"

export const VirtualRefinementList = connectRefinementList(() => null)
export const VirtualMenu = connectMenu(() => null)
export const VirtualRange = connectRange(() => null)
