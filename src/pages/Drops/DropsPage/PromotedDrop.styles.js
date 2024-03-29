import styled from "styled-components/macro"

import { overlayTextShadow } from "../../../../style-utils"

export const PromotedDropContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.image});
  background-color: var(--almost-white);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  color: var(--black25);
  border: 1px solid var(--gray75);
  transition: border-color 200ms ease;
  :hover {
    border: 1px solid var(--gray25);
  }

  .bottom-container {
    /* border-top: 1px solid var(--gray75);
		background: rgba(255, 255, 255, 0.8);
		margin: 0;
		height: 100px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		text-align: center;
		padding: var(--spacing1) 0;
		@media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
			height: 140px;
			padding: var(--spacing2) 0;
		} */

    width: 100%;
    height: 100px;
    color: white;
    padding: var(--spacing3) 0;
    ${overlayTextShadow}

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: flex-end;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 42%,
      rgba(0, 0, 0, 0.25) 62%,
      rgba(0, 0, 0, 0.8) 100%
    );
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .name {
    font-family: var(--font-family--serif);
    text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.07);
    max-width: 90%;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    padding-bottom: var(--spacing1);
    font-size: var(--font-size--m);
    @media (min-width: ${(p) => p.theme.breakpoints[4]}px) {
      font-size: var(--font-size--l);
      padding-bottom: var(--spacing2);
    }
  }

  .details {
    /* font-style: italic; */
    color: var(--gray75);
  }
`
