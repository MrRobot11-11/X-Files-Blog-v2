import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import '../Styles/style.css'
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"



const BlogIndex = ({ data, location }) => {
  const siteTitle = "X-Files Blog";
  
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Bio />
   
       
      <ul>
        {data.allContentfulBlogPost.edges.map(edge => (
          <li>
            <Link to={edge.node.slug} key={edge.node.id}>
              {edge.node.title}
            </Link>
            <div>
              <GatsbyImage
                image={edge.node.heroImage.gatsbyImageData}
                alt="test"
              />
            </div>
            <div>{edge.node.body.childMarkdownRemark.excerpt}</div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}


export default BlogIndex


export const pageQuery = graphql`
  {
    allContentfulBlogPost(sort: { order: ASC, fields: slug }) {
      edges {
        node {
          id
          title
          slug
          body {
            childMarkdownRemark {
              excerpt
              frontmatter {
                date
              }
            }
          }
          heroImage {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              width: 200
            )
          }
        }
      }
    }
  
  }
`
