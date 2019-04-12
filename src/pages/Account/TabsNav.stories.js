import React from "react"
import { storiesOf } from "@storybook/react"
import StoryRouter from "storybook-react-router"

import themeDecorator from "../../storybook-decorators/theme"
import TabsNav, { AccountPageTabs } from "./TabsNav"

const routes = [
	{
		id: "items",
		label: "Oferty",
		path: "#",
		isProtected: false,
		isDefault: true
	},
	{
		id: "savedItems",
		label: "Zapisane Przedmioty",
		path: "#",
		isProtected: true,
		category: "Zapisane",
		shortLabel: "Przedmioty"
	},
	{
		id: "savedFilters",
		label: "Zapisane Filtry",
		path: "#",
		isProtected: true,
		category: "Zapisane",
		shortLabel: "Filtry"
	},
	{
		id: "followedUsers",
		label: "Obserwowani Użytkownicy",
		path: "#",
		isProtected: true,
		category: "Zapisane",
		shortLabel: "Użytkownicy"
	},
	{
		id: "followedDrops",
		label: "Obserwowane Dropy",
		path: "#",
		isProtected: true,
		category: "Zapisane",
		shortLabel: "Dropy"
	},
	{
		id: "feedback",
		label: "Opinie",
		path: "#",
		isProtected: false
	},
	{
		id: "settings",
		label: "Opcje / Edytuj profil",
		path: "#",
		isProtected: true,
		isHidden: true
	}
]

storiesOf("AccountPageTabs", module)
	.addDecorator(themeDecorator)
	.addDecorator(StoryRouter())
	.add("unauthorized", () => <AccountPageTabs routes={routes} />)
	.add("authorized", () => <AccountPageTabs routes={routes} isAuthorized />)
	.add("unauthorized categorized", () => <AccountPageTabs routes={routes} categorized />)
	.add("authorized categorized", () => (
		<AccountPageTabs routes={routes} isAuthorized categorized />
	))
