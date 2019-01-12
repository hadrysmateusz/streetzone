import React from "react"
import ItemsView from "../ItemsView"
import EmptyState from "../EmptyState"
import { EMPTY_STATES } from "../../constants"

const UserTransactions = ({ soldItems }) => (
	<div>
		{soldItems && soldItems.length > 0 ? (
			<>
				<h3>Sprzedane przedmioty</h3>
				<ItemsView items={soldItems} />
			</>
		) : (
			<EmptyState state={EMPTY_STATES.UserNoSoldItems} />
		)}
	</div>
)

export default UserTransactions
