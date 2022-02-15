import ReactMarkdown from "react-markdown"

import { PreviewContainer } from "./PostPreview.styles"

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
