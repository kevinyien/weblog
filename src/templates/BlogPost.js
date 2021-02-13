import React from "react"
import { graphql } from "gatsby"

export const BlogPostTemplateQuery = graphql`
  query BlogPostTemplateQuery($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`

const BlogPost = ({ data }) => {
const { markdownRemark } = data // data.markdownRemark holds your post data
const { frontmatter, html } = markdownRemark
return (
  <div>
    <div>
      <h1>{frontmatter.title}</h1>
      <div>{frontmatter.date}</div>
      <div> {frontmatter.description}</div>
      <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
    </div>
  </div>
  )
}
export default BlogPost
