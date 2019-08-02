import React from "react"

import ManagementTemplate from "../ManagementTemplate"
import DealPreview from "./Preview"

const AdminDealsPage = () => (
	<ManagementTemplate
		firestoreCollection="deals"
		addRouteName="ADMIN_DEALS_ADD"
		addRouteText="Dodaj Okazje"
		heading="Okazje"
		PreviewComponent={DealPreview}
	/>
)

export default AdminDealsPage
