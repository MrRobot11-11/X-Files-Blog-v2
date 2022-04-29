import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from 'styled-components'

const Outer = styled.header`
  background-color: #666777;
  margin-bottom: 1.45rem;
`

const Inner = styled.div`
  margin: 2px;
  display: flex;
  flex-direction:row;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  
`

const H1 = styled.h1`
  margin: 6px;
  
`
const Links = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  padding-top: 20px;
  font-size: 1.7rem;

`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #1db825;
  }
`
//Comment
const Header = ({ siteTitle }) => (
  <Outer>
    <Inner>
      <H1>
        <StyledLink to="/">
          {siteTitle}  
        </StyledLink>
       
      </H1>
      <StyledLink to="/about/">
        <Links>About</Links>
        </StyledLink>
       <StyledLink to="/contact/">
        <Links>Contact</Links>
        </StyledLink>
    
    </Inner>
  </Outer>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `X-Files Blog`,
}

export default Header