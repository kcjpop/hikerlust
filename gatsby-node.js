const path = require('path')

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
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) return reject(result.errors)

    const component = path.resolve(__dirname, 'src/layouts/post.js')
    result.data.posts.edges.forEach(edge => {
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

exports.createPages = function(args) {
  return Promise.all([generatePosts(args)])
}
