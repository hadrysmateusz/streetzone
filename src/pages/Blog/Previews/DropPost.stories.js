import React from "react"
import { storiesOf } from "@storybook/react"
import DropPost from "./DropPost"
import StoryRouter from "storybook-react-router"
import themeDecorator from "../../../storybook-decorators/theme"

const mockedPost = {
	id: "some_id",
	title: "Lorem ipsum dolor sit amet",
	mainImageURL: "https://picsum.photos/850/520",
	dropsAt: 1554666539028
}

storiesOf("DropPost", module)
	.addDecorator(themeDecorator)
	.addDecorator(StoryRouter())
	.add("default", () => <DropPost {...mockedPost} />)
