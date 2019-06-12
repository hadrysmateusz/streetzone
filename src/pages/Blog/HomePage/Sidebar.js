import React from "react"
import { PoweredByBox } from "../../../components/Algolia/PoweredBy"
import Sidebar from "../../../components/Sidebar"

import TagsNav from "./TagsNav"

const availableElements = [
	{
		title: "Popularne Tagi",
		component: TagsNav
	},
	{ title: "Cośtam1", component: () => <div>adsf1</div> },
	{ title: "Cośtam2", component: () => <div>adsf2</div> },
	{ title: "Cośtam3", component: () => <div>adsf3</div> }
]

const BlogHomeSidebar = React.forwardRef((props, ref) => {
	return (
		<Sidebar ref={ref} availableElements={availableElements} isRandom>
			<PoweredByBox />
		</Sidebar>
	)
})

export default BlogHomeSidebar
