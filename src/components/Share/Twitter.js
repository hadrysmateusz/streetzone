import ShareButton from "./ShareButton"

const Twitter = (props) => {
  const tooltip = props.tooltip || "Udostępnij na Twitterze"
  const shareText = encodeURIComponent(props.shareText || "")
  const url = encodeURIComponent(props.url)
  const fullUrl = `https://twitter.com/intent/tweet/?text=${shareText}&url=${url}`

  return (
    <ShareButton
      variant="twitter"
      icon={["fab", "twitter"]}
      fullUrl={fullUrl}
      tooltip={tooltip}
      onClick={props.onClick}
    />
  )
}

export default Twitter
