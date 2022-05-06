
const { GraphQLJSONObject } = require(`graphql-type-json`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)


exports.createResolvers = ({ cache, createResolvers }) => {
  createResolvers({
    Query: {
      LunrIndex: {
        type: GraphQLJSONObject,
        resolve: (source, args, context, info) => {
          const blogNodes = context.nodeModel.getAllNodes({
            type: `MarkdownRemark`,
          })
          const type = info.schema.getType(`MarkdownRemark`)
          return createIndex(blogNodes, type, cache)
        },
      },
    },
  })
}
const createIndex = async (blogNodes, type, cache) => {
  const cacheKey = `IndexLunr`
  const cached = await cache.get(cacheKey)
  if (cached) {
    return cached
  }
  const documents = []
  const store = {}
  // iterate over all posts
  for (const node of blogNodes) {
    const { slug } = node.fields
    const title = node.frontmatter.title
    const [html, excerpt] = await Promise.all([
      type.getFields().html.resolve(node),
      type.getFields().excerpt.resolve(node, { pruneLength: 40 }),
    ])
    // once html is resolved, add a slug-title-content object to the documents array
    documents.push({
      slug,
      title: node.frontmatter.title,
      content: striptags(html),
    })

    store[slug] = {
      title,
      excerpt,
    }
  }
  const index = lunr(function() {
    this.ref("slug")
    this.field("title")
    this.field("content")
    for (const doc of documents) {
      this.add(doc)
    }
  })

  const json = { index: index.toJSON(), store }
  await cache.set(cacheKey, json)
  return json
}


const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      result.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
          path: edge.node.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            slug: edge.node.slug
          }
        })
      })
      resolve();
    })
  });
};

