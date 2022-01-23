import { useState, useEffect } from "react"
import moment from "moment"
import { withRouter } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { withBreakpoints } from "react-breakpoints"
import Ratio from "react-ratio"

import { PageContainer } from "../../../components/Containers"
import { TextBlock } from "../../../components/StyledComponents"
import { Tags } from "../../../components/Tags"
import LoadingSpinner from "../../../components/LoadingSpinner"
import FirebaseImage from "../../../components/FirebaseImage"
import Share from "../../../components/Share"
import PageNav from "../../../components/PageNav"
import { SimilarArticles } from "../../../components/SidebarComponents"
import { LayoutManager, Main, Sidebar } from "../../../components/LayoutManager"
import HelmetBasics from "../../../components/HelmetBasics"

import { useFirebase } from "../../../hooks"

import {
  Article,
  HeaderBox,
  InfoAside,
  InnerContainer,
  MainImageContainer,
  OuterContainer,
} from "./BlogPostPage.styles"

const usePost = (id) => {
  const [post, setPost] = useState(null)
  const firebase = useFirebase()

  useEffect(() => {
    const getPost = async () => {
      try {
        // Get data from db
        const snap = await firebase.post(id).get()
        const post = snap.data()

        // Un-escape new-line characters
        post.mainContent = post.mainContent.replace(/\\n/g, "\n")

        setPost(post)
      } catch (e) {
        console.error(e)
      }
    }

    getPost()
  }, [firebase, id])

  return post
}

const sidebarElements = [{ title: "Podobne artykuły", component: SimilarArticles }]

export const PureBlogPost = withBreakpoints(
  ({
    currentBreakpoint,
    category,
    title,
    excerpt,
    createdAt,
    mainImageIndex,
    author,
    tags,
    mainContent,
    attachments,
    id,
  }) => {
    const isMobile = currentBreakpoint <= 1

    return (
      <>
        <HelmetBasics title={title} />

        <HeaderBox category={category}>
          <PageContainer>
            {/* Page Nav */}
            <PageNav
              breadcrumbs={[
                ["Blog", "BLOG_HOME"],
                [category, "BLOG_CATEGORY", { category: category }],
                [title, "BLOG_POST", { id }],
              ]}
              white
            />
            {/* Category */}
            <div className="category">{category}</div>
            {/* Title */}
            <div className="title">{title}</div>
            {/* Excerpt */}
            <div className="excerpt">{excerpt}</div>
            {/* Crated Date */}
            <div className="date">{moment(createdAt).format("LL")}</div>
            {/* </InnerHeaderContainer> */}
          </PageContainer>
        </HeaderBox>

        <OuterContainer>
          <PageContainer>
            <LayoutManager>
              <Main>
                {/* Header image */}
                <MainImageContainer>
                  <Ratio ratio={16 / 9}>
                    <FirebaseImage storageRef={attachments[mainImageIndex]} size="L" />
                  </Ratio>
                </MainImageContainer>

                <InnerContainer>
                  {!isMobile && (
                    <InfoAside>
                      {/* Share buttons */}
                      <Share text={title} />

                      {/* Info */}
                      <div>
                        <div>
                          Dodano <b>{moment(createdAt).format("DD-MM-YY")}</b>
                        </div>
                        <div>
                          przez <b>{author}</b>
                        </div>
                        <div>
                          w <b>{category}</b>
                        </div>
                      </div>
                      {/* Tags */}
                      <div style={{ marginTop: "var(--spacing2)" }}>
                        <Tags tags={tags} />
                      </div>
                    </InfoAside>
                  )}
                  <Article>
                    {isMobile && <Share withHeader />}
                    <ReactMarkdown>{mainContent}</ReactMarkdown>
                    {isMobile && [
                      <TextBlock size="m" bold uppercase>
                        Tagi
                      </TextBlock>,
                      <Tags tags={tags} />,
                    ]}
                  </Article>
                </InnerContainer>
              </Main>
              <Sidebar availableElements={sidebarElements} isRandom />
            </LayoutManager>
          </PageContainer>
        </OuterContainer>
      </>
    )
  }
)

const BlogPost = withRouter(({ match }) => {
  const post = usePost(match.params.id)

  return post ? <PureBlogPost {...post} /> : <LoadingSpinner />
})

export default BlogPost
