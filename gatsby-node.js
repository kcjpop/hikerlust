const path = require('path')

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
  return Promise.all([generatePosts(args), generatePages(args)])
}

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })

  return config
}
