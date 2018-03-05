const path = require('path')

function generateTags({ graphql, boundActionCreators: { createPage } }) {
  return graphql(
    `
      query AllTags {
        tags: allContentfulTag {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) return reject(result.errors)

    const component = path.resolve(__dirname, 'src/layouts/tags.js')
    result.data.tags.edges.forEach(edge => {
      createPage({
        component,
        path: `/tag/${edge.node.slug}`,
        context: edge.node
      })
    })
  })
}

function generatePages({ graphql, boundActionCreators: { createPage } }) {
  return graphql(
    `
      query AllPages {
        pages: allContentfulPage {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) return reject(result.errors)

    const component = path.resolve(__dirname, 'src/layouts/page.js')
    result.data.pages.edges.forEach(edge => {
      createPage({
        component,
        path: `/${edge.node.slug}`,
        context: {
          id: edge.node.id
        }
      })
    })
  })
}

function generatePosts({ graphql, boundActionCreators: { createPage } }) {
  return graphql(
    `
      query AllPosts {
        posts: allContentfulPost {
          edges {
            node {
              id
              title
              slug
              tags {
                id
                post {
                  id
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) return reject(result.errors)

    const component = path.resolve(__dirname, 'src/layouts/post.js')
    result.data.posts.edges.forEach(edge => {
      // @TODO: Should define a tag for relating posts
      const [tag] = [...edge.node.tags].sort((a, b) => {
        return a.length - b.length
      })

      createPage({
        component,
        path: `/${edge.node.slug}`,
        context: {
          id: edge.node.id,
          tagId: tag ? tag.id : null
        }
      })
    })
  })
}

exports.createPages = function(args) {
  return Promise.all([generatePosts(args), generatePages(args), generateTags(args)])
}

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })

  return config
}
