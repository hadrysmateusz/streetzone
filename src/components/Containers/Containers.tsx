import styled from "styled-components/macro"

type PageContainerProps = {
  maxWidth?: number
  extraWide?: boolean
  fullHeight?: boolean
}

export const PageContainer = styled.section<PageContainerProps>`
  max-width: ${(p) => p.theme.breakpoints[5]}px; /* default */
  ${(p) =>
    typeof p.maxWidth === "number"
      ? `max-width: ${p.theme.breakpoints[p.maxWidth]}px;`
      : undefined}

  --padding-x: ${(p) => (p.extraWide ? "3px" : "var(--spacing3)")};

  width: 100%;
  ${(p) => p.fullHeight && "height: 100%;"};

  margin: 0 auto;
  padding: 0 var(--padding-x);

  @media (min-width: ${(p) => p.theme.breakpoints[0]}px) {
    --padding-x: var(--spacing3);
  }
`

export const MainPageContainer = styled.div`
  min-height: calc(100vh - var(--page-header-height));
  padding-bottom: var(--spacing3);
`

const CenteredContainerBox = styled.div`
  flex-shrink: 0;

  display: block;
  margin: 0 auto;
  min-height: 0;
  width: 320px;
  max-width: 100%;
  padding: var(--spacing3);
`
const OuterCenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  /* TODO: Do centering in a different way because this breaks the build */
  /* &::before,
	&::after {
		content: "";
		display: block;
		flex-grow: 1;
		min-height: 150px;
	}

	&::before {
		margin-top: -150px;
	} */
`

export const CenteredContainer: React.FC = ({ children }) => (
  <OuterCenteredContainer>
    <CenteredContainerBox>{children}</CenteredContainerBox>
  </OuterCenteredContainer>
)

// const OuterGrayContainer = styled.section`
//   width: 100%;
//   background: var(--gray100);
//   ${(p) => p.padded && "padding: var(--spacing4) 0;"}
// `
// export const GrayContainer = ({ padded, children, ...props }) => (
//   <OuterGrayContainer padded={padded}>
//     <PageContainer {...props}>{children}</PageContainer>
//   </OuterGrayContainer>
// )
