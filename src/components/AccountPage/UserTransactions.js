import React from "react"
import ItemsView from "../ItemsView"
import EmptyState, { UserNoSoldItems } from "../EmptyState"

const UserTransactions = ({ soldItems }) => (
	<div>
		{soldItems && soldItems.length > 0 ? (
			<>
				<h3>Sprzedane przedmioty</h3>
				<ItemsView items={soldItems} />
			</>
		) : (
			<EmptyState state={UserNoSoldItems} />
		)}
	</div>
)

export default UserTransactions
