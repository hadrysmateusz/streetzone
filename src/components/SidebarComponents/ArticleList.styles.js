import styled from "styled-components/macro"

export const ArticleContainer = styled.div`
  min-width: 0; /* this has to be on the outermost component*/
  width: 100%;
  margin-bottom: var(--spacing3);

  > a {
    overflow: hidden;
    display: grid;
    grid-template-columns: 4fr 10fr;
    grid-template-rows: 66px;
  }
`

export const Title = styled.div`
  margin-left: var(--spacing2);
  height: 100%;
  display: flex;
  align-items: center;
`
