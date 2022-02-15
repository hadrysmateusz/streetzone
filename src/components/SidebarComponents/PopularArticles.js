import { CONST } from "../../constants"

import { StatelessSearchWrapper } from "../InstantSearchWrapper"

import ArticleList from "./ArticleList"

const PopularArticles = () => (
  <StatelessSearchWrapper indexName={CONST.BLOG_POST_ALGOLIA_INDEX} limit={3} refinements={{}}>
    {(results) => <ArticleList articles={results} />}
  </StatelessSearchWrapper>
)

export default PopularArticles
