const { createFilePath } = require("gatsby-source-filesystem")
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// function to fetch articles from CMS
async function getPageData(graphql) {
  return await graphql(`
    {
      blogPosts: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
}

// create new page for every node
const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await getPageData(graphql)
  data.blogPosts.edges.forEach(({ node }) => {
    const { slug } = node.fields
    actions.createPage({
      path: `/blog${slug}`,
      component: path.resolve("./src/templates/BlogPost.js"),
      context: { slug: slug },
    })
  })
}
