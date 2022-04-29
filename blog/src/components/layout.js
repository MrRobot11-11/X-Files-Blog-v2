import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Header from "./header"
import styled from "styled-components"
import BackgroundImage from 'gatsby-background-image'



const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = rootPath
  let header
  
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "xfiles-3.jpg" }) {
          childImageSharp {
            fluid(quality: 100,  fit: COVER) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )


  // Set ImageData.
  const imageData = data.desktop.childImageSharp.fluid

 

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
   <BackgroundImage
      Tag="section"
      fluid={imageData}
      backgroundColor={`#040e18`}
      width={100}
      
    >
    
    <div className="global-wrapper" data-is-root-path={isRootPath}>
     
        
    
      <Header  />
      
      <main>{children}
      
      </main>
      <footer>
       
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
     
      </footer>
     
    </div>
     </BackgroundImage>
    
  )
}

export default Layout
