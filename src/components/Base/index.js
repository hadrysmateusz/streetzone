import styled from "styled-components"
import { style } from "styled-system"

const pageContainerWidth = style({
	prop: "maxWidth",
	cssProperty: "max-width",
	key: "breakpoints",
	transformValue: (n) => n + "px"
})

const PageContainer = styled.main`
	${pageContainerWidth}
	margin: 0 auto;
	padding: 0 20px;
`

export { PageContainer }
