import styled from "styled-components/macro"

export const GradientSwatch = styled.div`
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

export const Swatch = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(p) => p.color};
  border: 1px dashed gray;
`
