import React from "react"

import ManagementTemplate from "../ManagementTemplate"
import AuthorPreview from "./Preview"
import RequestedDesigners from "./RequestedDesigners"

const Authors = () => (
	<ManagementTemplate
		firestoreCollection="authors"
		addRouteName="ADMIN_AUTHOR_ADD"
		addRouteText="Dodaj Autora"
		heading="Autorzy"
		PreviewComponent={AuthorPreview}
	>
		<RequestedDesigners />
	</ManagementTemplate>
)

export default Authors
