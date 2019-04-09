import React from "react"
import { storiesOf } from "@storybook/react"
import SmallPost from "./SmallPost"
import StoryRouter from "storybook-react-router"
import themeDecorator from "../../../storybook-decorators/theme"

const mockedPost = {
	id: "some_id",
	title: "Lorem ipsum dolor sit amet",
	mainImageURL: "https://picsum.photos/850/520",
	createdAt: 1554666539028
}

storiesOf("SmallPost", module)
	.addDecorator(themeDecorator)
	.addDecorator(StoryRouter())
	.add("default", () => <SmallPost {...mockedPost} />)
