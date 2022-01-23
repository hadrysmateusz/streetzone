import styled from "styled-components/macro"
import { Link } from "react-router-dom"

export const OuterContainer = styled.div`
  text-align: center;
  margin-top: 23vh;
`

export const StatusCode = styled.div`
  font-size: 160px;
  line-height: 1em;
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: 300px;
  }
  font-weight: bold;
  color: #f1f1f1;
`

export const Message = styled.div`
  color: #e8e8e8;
  font-size: var(--fs-m);
  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    font-size: var(--fs-xl);
  }
  font-weight: bold;
`

export const ActionLink = styled(Link)`
  margin-top: var(--spacing3);
  color: var(--black0);
  display: block;
  text-decoration: underline;
  font-weight: var(--semi-bold);
`
