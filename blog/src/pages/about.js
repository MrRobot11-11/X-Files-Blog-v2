import React from "react"
import { graphql, Link } from "gatsby" //If want to create link to another page/component, need gatsby link


import Layout from "../components/layout"
import Seo from "../components/seo"

const About = ({ data }) => { //Destructure data to get name, company
    const { name, company } = data.site.siteMetadata.contact;//structure of the query-> where the query comes from
    return ( //Grouping html that we're going to return
        <Layout> {/**Main layout, can use other layouts in site */}
            <Seo title="About" />
            <h1>About Us</h1> 
            <p>{`${company} was started by ${name} in 2020.`}</p>  {/* Javascript running on this line */}
            <p>{`At ${company} we just make blogs!`}</p>
            
            <Link to="/">Home</Link> {/**Gatsby link component */}
            </Layout>
        )
}

export default About //Have to export so build engine can access it

/*Running query through function graphgl() */
export const query = graphql`
    query {
        site {
            siteMetadata {
                contact {
                    name
                    company
                    
                }
            }
        }
    }
`