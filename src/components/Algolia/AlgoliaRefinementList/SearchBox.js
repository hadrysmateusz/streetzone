import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SearchBox as SearchBoxContainer } from "../StyledComponents"

const SearchBox = ({ value, onChange, clear }) => (
	<SearchBoxContainer>
		<div className="icon-container">
			<FontAwesomeIcon icon="search" />
		</div>
		<input type="text" placeholder="Szukaj" onChange={onChange} value={value} />
		{value && (
			<div className="icon-container" onClick={clear}>
				<FontAwesomeIcon icon="times" />
			</div>
		)}
	</SearchBoxContainer>
)

export default SearchBox
