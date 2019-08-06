import React from "react"

import ManagementTemplate from "../ManagementTemplate"
import AuthorPreview from "./Preview"

const Authors = () => (
	<ManagementTemplate
		firestoreCollection="authors"
		addRouteName="ADMIN_AUTHORS_ADD"
		addRouteText="Dodaj Autora"
		heading="Autorzy"
		PreviewComponent={AuthorPreview}
	/>
)

export default Authors
