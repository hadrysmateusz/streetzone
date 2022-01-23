import styled from "styled-components/macro"

export const Submenu = styled.div`
  background: white;

  border: 1px solid var(--gray75);

  display: grid;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  min-height: 50px;
`

export const SubmenuContainer = styled.div`
  position: absolute;
  top: 100%;

  ${(p) => `${p.align}: 0;`}
  z-index: 81;

  display: none;
`

export const Indicator = styled.div`
  position: relative;
  font-size: 1.9rem;

  .number-display {
    --size: 1.8rem;
    position: absolute;
    bottom: -1px;
    right: -5px;
    border-radius: calc(var(--size) / 2);
    background: var(--black0);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    padding: 0 6px;
    /* width: auto; */
    height: var(--size);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const MessagesContainer = styled.div`
  padding: var(--spacing2) 0;
`

export const MessageStyles = styled.div`
  padding: var(--spacing2) var(--spacing3);
  font-size: 11px;

  :hover {
    background: var(--almost-white);
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing1);

    .name {
      font-weight: bold;
      text-transform: uppercase;
      margin-left: var(--spacing2);
    }
  }

  .message {
    color: var(--black75);
  }
`

export const HasMoreContainer = styled.div`
  border-top: 1px solid var(--gray75);
  padding: var(--spacing2) var(--spacing3);
  font-weight: bold;
  background: var(--almost-white);

  :hover {
    background: var(--gray100);
  }
`

export const MessagesListOuterContainer = styled.div`
  /* reset the changes applied by active link styles */
  font-size: initial;
  text-transform: initial;
  color: initial;
  font-weight: initial;
`

export const ManagerStyles = styled.div`
  color: black;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;

  .empty-state {
    padding: var(--spacing3);
    font-style: italic;
    color: var(--gray0);
  }

  @media (min-width: ${(p) => p.theme.breakpoints[2]}px) {
    :hover > ${SubmenuContainer} {
      display: block;
    }
  }
`

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: var(--fs-xs);
  color: var(--gray0);
`
