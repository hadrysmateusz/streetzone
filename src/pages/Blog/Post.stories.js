import React from "react"
import { storiesOf } from "@storybook/react"
import Post from "./Post"
import { action } from "@storybook/addon-actions"

storiesOf("Blog Post Page", module).add("default", () => <Post />)
