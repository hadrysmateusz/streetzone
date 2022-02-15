import styled, { css } from "styled-components/macro"

// utils

type FontWeightProps = {
  bold?: boolean
  light?: boolean
  normal?: boolean
}

type TextBaseProps = FontWeightProps & {
  uppercase?: boolean
}

export type BodyTextBaseProps = TextBaseProps & {
  serif?: boolean
  italic?: boolean

  color?: string
  size?: "xs" | "s" | "m" | "l" | "xl" | "xxl"
}

// TODO: stop using booleans for weight
// interface FontWeightProps {
//   bold?: boolean
//   light?: boolean
//   normal?: boolean
// }
const fontWeight = ({
  bold = false,
  light = false,
  normal = false,
}: FontWeightProps) => css`
  ${bold ? "font-weight: 700" : undefined};
  ${light ? "font-weight: 300" : undefined};
  ${normal ? "font-weight: 400" : undefined};
`

// interface TextBaseProps extends FontWeightProps {
//   uppercase?: boolean
// }
const textBase = ({ uppercase = false, ...rest }: TextBaseProps) => css`
  ${fontWeight(rest)}
  ${uppercase ? "text-transform: uppercase" : undefined};
`

// interface BodyTextBaseProps extends TextBaseProps {
//   serif?: boolean
//   italic?: boolean
//
//   color?: string
//   size?: "xs" | "s" | "m" | "l" | "xl" | "xxl"
// }
const bodyTextBase = ({
  serif = false,
  italic = false,
  color = undefined,
  size = undefined,
  ...rest
}: BodyTextBaseProps) => css`
  ${textBase(rest)};
  ${serif ? "font-family: var(--font-family--serif)" : undefined};
  ${color ? `color: var(--${color})` : undefined};
  ${italic ? `font-style: italic` : undefined};
  ${size ? `font-size: var(--font-size--${size})` : undefined};
`

// text

export type TextBlockProps = BodyTextBaseProps & {
  centered?: boolean
}
export const TextBlock = styled.div<TextBlockProps>`
  ${(p) => bodyTextBase(p)}

  ${(p) => (p.centered ? "text-align: center" : undefined)};
`

export type TextProps = BodyTextBaseProps & {}
export const Text = styled.span<TextProps>`
  ${(p) => bodyTextBase(p)}
`

export const SmallTextBlock = styled(TextBlock).attrs<TextBlockProps>(
  (props) => ({
    color: "gray0",
    size: "xs",
    uppercase: "true",
    ...props,
  })
)``

export const SmallText = styled(Text).attrs<TextProps>((props) => ({
  color: "gray0",
  size: "xs",
  uppercase: "true",
  ...props,
}))``

// containers

interface HorizontalContainerProps {
  justifyContent?:
    | "start"
    | "end"
    | "flex-start"
    | "flex-end"
    | "center"
    | "left"
    | "right"
    | "normal"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "safe"
    | "unsafe"
  gap: 1 | 2 | 3 | 4 | 5 | 6
}
export const HorizontalContainer = styled.div<HorizontalContainerProps>`
  display: flex;
  ${(p) =>
    p.justifyContent ? `justify-content: ${p.justifyContent}` : undefined};
  ${(p) =>
    p.gap
      ? css`
          > * + * {
            ${"padding-left: var(--spacing" + p.gap + ")"};
          }
        `
      : undefined}
`
