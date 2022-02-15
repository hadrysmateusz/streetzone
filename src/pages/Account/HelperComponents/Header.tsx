import { connectStats } from "react-instantsearch-dom"

import { HeaderContainer } from "../Common.styles"
import React from "react";

export const Header: React.FC<{ count: number }> = ({ count, children }) => (
  <HeaderContainer>
    {children} <div className="count">{count}</div>
  </HeaderContainer>
)

export const ConnectedHeader = connectStats(({ nbHits, children }) => (
  <Header count={nbHits}>{children}</Header>
))
