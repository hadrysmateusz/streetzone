import styled from "styled-components/macro"

export const IndicatorContainer = styled.div`
  display: flex;
  align-items: center;
`

export type IndicatorBubbleProps = {
  isCurrent?: boolean
  scale?: number
  primaryColor?: string
  secondaryColor?: string
}

export const IndicatorBubble = styled.div<IndicatorBubbleProps>`
  --size: calc(
    ${(p) => (p.isCurrent ? "1.5" : "1")} * 4px * ${(p) => p.scale ?? 1}
  );
  --primary-color: ${(p) => p.primaryColor ?? "white"};
  --secondary-color: ${(p) => p.secondaryColor ?? "white"};

  background: ${(p) =>
    p.isCurrent ? "var(--primary-color)" : "var(--secondary-color)"};
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  :not(:first-child) {
    margin-left: var(--spacing1);
  }
`

export const IndicatorOuterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: var(--spacing2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
`
