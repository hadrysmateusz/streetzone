import styled from "styled-components/macro"

import { getCategoryColor } from "../../style-utils"

export const SidebarContainer = styled.aside`
  width: 25%;
  min-width: 220px;
  align-self: flex-start;
`

export const SidebarHeader = styled.div`
  font-size: var(--font-size--m);
  font-weight: bold;
  margin-bottom: var(--spacing2);

  border-left: 4px solid ${(p) => getCategoryColor(p.category)};
  padding-left: var(--spacing2);
  line-height: 1.3;
`

export const SidebarSectionContainer = styled.div`
  /* background: rgba(255, 0, 0, 0.2);
	border-bottom: 1px solid green; */

  width: 100%;
  overflow: hidden;
  :not(:last-child) {
    height: calc(100vh - var(--page-header-height));
  }
`
