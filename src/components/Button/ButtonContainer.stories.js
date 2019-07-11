import React from "react"
import { storiesOf } from "@storybook/react"

import breakpointsDecorator from "../../storybook-decorators/breakpoints"
import "../../normalize.css"
import "../../config/fontAwesomeConfig"
import "../../index.css"
import { ButtonContainer, Button, IconButton } from "."

storiesOf("ButtonContainer", module)
	.addDecorator(breakpointsDecorator)
	.add("row 2", () => (
		<ButtonContainer direction="row">
			<Button primary>Primary</Button>
			<Button>Regular Button</Button>
			<IconButton icon="ellipsis-h">Więcej</IconButton>
		</ButtonContainer>
	))
