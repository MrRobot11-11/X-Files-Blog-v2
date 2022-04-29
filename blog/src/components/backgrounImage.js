import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from "gatsby-plugin-image"

import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'

const GbiBridged = () => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "xfiles-.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              width: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF, JPG]
            )
          }
        }
      }
    `
  )
  const image = getImage(placeholderImage)


  const bgImage = convertToBgImage(image)

  return (
    <BackgroundImage
      Tag="section"
      // Spread bgImage into BackgroundImage:
      {...bgImage}
      preserveStackingContext
    >
      <div style={{maxHeight: 30, minWidth: 50}}>
        <GatsbyImage image={image} alt={"testimage"}/>
      </div>
    </BackgroundImage>
  )
}
export default GbiBridged