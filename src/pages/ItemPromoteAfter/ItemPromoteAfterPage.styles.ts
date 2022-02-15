import { Link } from "react-router-dom"
import styled from "styled-components/macro"

export const Text = styled.div`
  color: var(--gray0);
  font-size: var(--fs-s);
  text-align: center;
  max-width: 430px;
  margin: 0 auto;
  margin-top: var(--spacing3);
`

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: underline;
  font-weight: var(--semi-bold);
  cursor: pointer;
`
