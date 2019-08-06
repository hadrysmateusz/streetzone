// Currently not used (the list is hard-coded in a constants file instead)
// There might be real reasons to use a database solution after all though
// Caching might be a problem (especially with Cloudflare)
// It would also be easier to use for maintainers if I ever stop maintaining the project myself

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
