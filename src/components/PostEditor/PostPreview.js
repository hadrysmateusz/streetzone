import React from "react"
import styled from "styled-components/macro"
import ReactMarkdown from "react-markdown"

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

const PostPreview = ({ attachments, markdownSource }) => {
  const modifiedSource = markdownSource.replace(/ID\[.+\]/g, (match) => {
    const id = match.slice(3, -1)
    if (!Array.isArray(attachments)) return ""
    return attachments.find((a) => a.id === id).previewUrl
  })

  return (
    <PreviewContainer>
      <ReactMarkdown>{modifiedSource}</ReactMarkdown>
    </PreviewContainer>
  )
}

export default PostPreview
