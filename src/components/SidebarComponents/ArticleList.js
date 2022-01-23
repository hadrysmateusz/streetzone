import { memo } from "react"
import { Link } from "react-router-dom"

import { route } from "../../utils"

import FirebaseImage from "../FirebaseImage"

import { ArticleContainer, Title } from "./ArticleList.styles"

const Article = memo(({ id, title, attachments, mainImageIndex }) => (
  <ArticleContainer>
    <Link to={route("BLOG_POST", { id })}>
      <FirebaseImage storageRef={attachments[mainImageIndex]} size="M" />
      <Title>{title}</Title>
    </Link>
  </ArticleContainer>
))

const ArticleList = memo(({ articles }) =>
  articles.map((article) => <Article key={article.id} {...article} />)
)

export default ArticleList
