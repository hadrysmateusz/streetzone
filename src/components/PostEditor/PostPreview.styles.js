import styled from "styled-components/macro"

import { overlayCommon } from "../../style-utils"

export const PreviewContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--gray25);
  padding: 0 var(--spacing2);
  position: relative;
  min-height: 100px;

  :empty {
    ::before {
      ${overlayCommon}
      content: "Podgląd";
      color: var(--gray100);
      font-size: 3.5rem;
      font-weight: bold;
    }
  }

  img {
    max-width: 100%;
    max-height: 900px;
  }
`
