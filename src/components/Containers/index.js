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
	width: 100%;
	padding: 10px;
	flex: 1;
	display: flex;
	flex-direction: column;
	@media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
		padding: 20px;
	}
`

const BlogPageContainer = styled.main`
	${pageContainerWidth}
	margin: 0 auto;
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	@media (min-width: ${pageContainerWidth}) {
		padding: 20px;
	}
`

export { PageContainer, BlogPageContainer }
