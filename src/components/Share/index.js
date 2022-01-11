import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components/macro"

import { TextBlock } from "../StyledComponents"

const ShareContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, min-content);
  grid-auto-flow: column;
  justify-content: start;
  gap: var(--spacing3);
  color: var(--gray50);
  line-height: 1em;
  font-size: var(--font-size--m);
  @media (min-width: ${(p) => p.theme.breakpoints[1]}px) {
    font-size: var(--font-size--l);
  }
  & > a {
    cursor: pointer;
  }
  & > a:hover svg {
    color: var(--black75);
  }
`

const Share = ({ withHeader, text }) => {
  const msg = text + " " + window.location.href

  return (
    <>
      {withHeader && (
        <TextBlock size="xs" uppercase color="gray0">
          Udostępnij
        </TextBlock>
      )}
      <ShareContainer>
        <a
          href={`https://twitter.com/intent/tweet/?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Udostępnij na Twitterze"
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a
          href={`https://facebook.com/sharer/sharer.php`}
          target="_blank"
          rel="noopener noreferrer"
          title="Udostępnij na Facebooku"
        >
          <FontAwesomeIcon icon={["fab", "facebook-square"]} />
        </a>
        <a
          href={`mailto:?subject=${msg}`}
          target="_self"
          rel="noopener noreferrer"
          title="Udostępnij na Instagramie"
        >
          <FontAwesomeIcon icon={["fa", "envelope"]} />
        </a>
      </ShareContainer>
    </>
  )
}

// <!-- Sharingbutton Facebook -->
// <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="">
//   <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm3.6 11.5h-2.1v7h-3v-7h-2v-2h2V8.34c0-1.1.35-2.82 2.65-2.82h2.35v2.3h-1.4c-.25 0-.6.13-.6.66V9.5h2.34l-.24 2z"/></svg>
//     </div>
//   </div>
// </a>

// <!-- Sharingbutton Twitter -->
// <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;url=http%3A%2F%2Fsharingbuttons.io" target="_blank" rel="noopener" aria-label="">
//   <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z"/></svg>
//     </div>
//   </div>
// </a>

// <!-- Sharingbutton E-Mail -->
// <a class="resp-sharing-button__link" href="mailto:?subject=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp;body=http%3A%2F%2Fsharingbuttons.io" target="_self" rel="noopener" aria-label="">
//   <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solidcircle">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm8 16c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8z"/><path d="M17.9 8.18c-.2-.2-.5-.24-.72-.07L12 12.38 6.82 8.1c-.22-.16-.53-.13-.7.08s-.15.53.06.7l3.62 2.97-3.57 2.23c-.23.14-.3.45-.15.7.1.14.25.22.42.22.1 0 .18-.02.27-.08l3.85-2.4 1.06.87c.1.04.2.1.32.1s.23-.06.32-.1l1.06-.9 3.86 2.4c.08.06.17.1.26.1.17 0 .33-.1.42-.25.15-.24.08-.55-.15-.7l-3.57-2.22 3.62-2.96c.2-.2.24-.5.07-.72z"/></svg>
//     </div>
//   </div>
// </a>

export default Share
