import React from "react"
import { storiesOf } from "@storybook/react"
import PromotedPost from "./PromotedPost"
import StoryRouter from "storybook-react-router"
import themeDecorator from "../../../storybook-decorators/theme"

const mockedPost = {
	id: "some_id",
	section: "Artykuły",
	title: "Lorem ipsum dolor sit amet",
	mainImageURL: "https://picsum.photos/850/520"
}

const dropCommon = {
	dropsAt: 1554666539028
}

const otherCommon = {
	createdAt: 1554666539028,
	author: "Krzysiu"
}

storiesOf("PromotedPost", module)
	.addDecorator(themeDecorator)
	.addDecorator(StoryRouter())
	.add("article/knowledge", () => <PromotedPost {...mockedPost} {...otherCommon} />)
	.add("drop", () => <PromotedPost {...mockedPost} {...dropCommon} />)
