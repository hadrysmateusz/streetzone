import React from "react"
import { Input } from "../../FormElements"

const SearchBox = ({ value, onChange, clear }) => (
	<Input icon="search" value={value} placeholder="Szukaj" onChange={onChange} />
)

export default SearchBox
