import { UncontrolledInstantSearchWrapper, InstantSearchWrapper } from "./old"
import SearchWrapper from "./stateful"
import StatelessSearchWrapper, { SearchWrapperContext } from "./stateless"

export default InstantSearchWrapper

export {
	SearchWrapper,
	StatelessSearchWrapper,
	InstantSearchWrapper,
	UncontrolledInstantSearchWrapper,
	SearchWrapperContext
}
