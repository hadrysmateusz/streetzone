import React from "react"
import { Section } from "../Common.styles"

export type SimpleFFWrapperProps = {
  label: string | undefined
}

export const SimpleFFWrapper: React.FC<{ label: string | undefined }> = ({
  label,
  children,
}) => {
  return (
    <Section>
      {label ? <div className="header">{label}</div> : null}
      <>{children}</>
    </Section>
  )
}
