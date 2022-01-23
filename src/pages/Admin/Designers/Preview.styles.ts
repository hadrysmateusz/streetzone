import styled from "styled-components/macro"

type GradientSwatchProps = { colorA: string; colorB: string }
export const GradientSwatch = styled.div<GradientSwatchProps>`
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, ${(p) => p.colorA}, ${(p) => p.colorB});
  border: 1px dashed gray;
`

export const FlexContainer = styled.div`
  display: grid;
  grid-auto-columns: 1fr min-content;
  grid-auto-flow: column;
`

type LogoContainerProps = { url: string }
export const LogoContainer = styled.div<LogoContainerProps>`
  height: 120px;
  width: 120px;
  border: 1px dashed black;
  position: relative;
  z-index: 70;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: ${(p) => `url(${p.url})`};
`

export const DesignerItemContainer = styled.div`
  margin: var(--spacing2) 0;
  border: 1px solid black;
  padding: var(--spacing2);
`
