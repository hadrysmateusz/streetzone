import styled from "styled-components/macro"

export const FieldLabel = styled.div`
  font-weight: bold;
`


type SectionProps = {
  flex?:boolean
}
export const Section = styled.div<SectionProps>`
  ${(p) => p.flex ? `display: flex`: undefined};

  .sub-section {
    flex: 1 1 50%;
    :not(:last-child) {
      margin-right: var(--spacing2);
    }
  }

  .header {
    font-weight: bold;
  }
`
