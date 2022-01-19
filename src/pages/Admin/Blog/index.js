import React from "react"

import ManagementTemplate from "../ManagementTemplate"
import PostPreview from "./Preview"

const BlogManagement = () => (
	<ManagementTemplate
		firestoreCollection="posts"
		addRouteName="ADMIN_BLOG_ADD"
		addRouteText="Dodaj Post"
		heading="Posty"
		PreviewComponent={PostPreview}
	/>
)

export default BlogManagement
