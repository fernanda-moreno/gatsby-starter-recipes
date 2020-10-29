import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Layout, PostCard, Pagination } from '../components/common'
import { InputLabel, Input } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**
* Main index page (home page)
* Loads all posts
*
*/
const Index = props => {
  const { data, pageContext } = props
  const allRecipes = data.allRecipe.edges
  const useStyles = makeStyles((theme) => ({
    menuItem: {
      width: 180,
      fontSize: 18,
      marginBottom: "2vh"
    },
    inputLabelSize: {
      fontSize: 12
    }
  }));

  const emptyQuery = ""
  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const classes = useStyles();


  const handleChange = event => {
    const { data, pageContext } = props
    const query = event.target.value
    const recipes = data.allRecipe.edges || []
    const filteredData = recipes.filter(post => {
      const { tags } = post.node
      if (query == "All")
        return query
      return (
        tags.toLowerCase().includes(query.toLowerCase())
      )
    })
    setState({ selected: query, filteredData });
  }
  const handleInputChange = event => {
    console.log(event.target.value)
    const query = event.target.value
    const { data, pageContext } = props
    const recipes = data.allRecipe.edges || []
    const filteredData = recipes.filter(post => {
      const { description, name, tags } = post.node
      return (
        description.toLowerCase().includes(query.toLowerCase()) ||
        name.toLowerCase().includes(query.toLowerCase()) ||
        tags.toLowerCase().includes(query.toLowerCase())
      )
    })
    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const recipes = hasSearchResults ? filteredData : allRecipes
  // const classes = useStyles();

  return (
    <>

      <Layout isHome={true}>
        <div className="container">
          <div className="flex-grid">
            <div className="col">
              <InputLabel id="label" className={classes.inputLabelSize}>Search</InputLabel>
              <Input
                className={classes.menuItem}
                type="text"
                aria-label="Search"
                placeholder="Whatcha hungry for?"
                onChange={handleInputChange}
              />
            </div>
            <div className="col">
              <InputLabel id="label" className={classes.inputLabelSize}>Filter by</InputLabel>
              <Select labelId="label"
                id="select"
                value={state.selected}
                className={classes.menuItem}
                onChange={handleChange}>
                <MenuItem className={classes.menuItem} value="All">All</MenuItem>
                <MenuItem className={classes.menuItem} value="Meal">Meal</MenuItem>
                <MenuItem className={classes.menuItem} value="Dessert">Dessert</MenuItem>
                <MenuItem className={classes.menuItem} value="Snack">Snack</MenuItem>
              </Select>
            </div>
          </div>
          <section className="post-feed">
            {recipes.map(({ node }) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  )
}


export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query {
    allRecipe(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
      edges {
        node {
          id
          name
          slug
          description
          tags
          ingredients {
            amount
            unit
            product
          }
          steps {
            step
            image {
              extension
              id
            }
          }
          cookingTime
          servings
          image {
            extension
            id
          }
        }
      }
    }
  }
`
