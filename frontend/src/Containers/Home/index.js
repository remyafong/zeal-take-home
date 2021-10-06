import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper, StyledListItem } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import Recipe from "../Recipe"
import { withRouter } from "react-router-dom";

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.fetchRecipe = this.fetchRecipe.bind(this)
    this.addSearchParams = this.addSearchParams.bind(this)
    this.deleteSearchParams = this.deleteSearchParams.bind(this)
    this.state = {
      term: "",
      ingredients: ["milk"],
      searchClicked: false
    }
  }
  componentDidMount() {
    const search = this.getSearchParams("search")
    const ingredients = this.getSearchParams("ingredients")
    const ingredientsList = ingredients ? ingredients.split(',') : [];
    const recipe = this.getSearchParams("recipe")

    if (search) {
      this.setState({ term: search })
    }
    if (ingredients !== null) {
      this.setState({ ingredients: ingredientsList })
    }
    // Check not null because they can be empty, indicating an empty search term and/or no ingredients selected
    if (search !== null || ingredients !== null) {
      this.fetchSearch(search, ingredientsList)
    }
    if (recipe) {
      this.fetchRecipe(recipe)
    }
  }
  getSearchParams(key) {
    const searchParams = new URLSearchParams(location.search)
    const value = searchParams.get(key)
    return value;
  }
  addSearchParams(key,value) {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set(key, value)
    this.props.history.push({
      search: searchParams.toString()
    })
  }
  deleteSearchParams(key) {
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete(key)
    this.props.history.push({
      search: searchParams.toString()
    })
  }
  fetchRecipe(recipeId) {
    if (recipeId) {
      this.addSearchParams("recipe", recipeId)
    }
    else {
      this.deleteSearchParams("recipe")
    }
    this.props.getRecipe(recipeId)
  }
  fetchSearch(term, ingredients) {
    this.setState({ searchClicked: true })
    this.addSearchParams("search", term)
    this.addSearchParams("ingredients", ingredients)
    this.props.searchRecipes(term, ingredients)
    // Clear recipe on search to avoid confusion with search results
    this.fetchRecipe("")
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ ingredients })
  }
  render() {
    const { term, ingredients, searchClicked } = this.state
    const { recipes, isLoading, recipe, isRecipeLoading, recipeError } = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
          placeholder="Find a recipe"
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={() => this.fetchSearch(term, ingredients)}>search</Button>
        <Divider />
        {isLoading && <LinearProgress />}
        {searchClicked && <h3>Search results</h3>}
        {searchClicked && !isLoading && (!recipes || recipes.length === 0) && <div>No results found</div>}
        {recipes && (
            <List>
              {recipes.map((r) => (
                <StyledListItem key={r.id} onClick={() => this.fetchRecipe(r.id)} selected={recipe ? recipe._id === r.id : false}>
                  <ListItemText primary={r.name} />
                </StyledListItem>
              ))}
            </List> 
        )}
        <Divider />
        {isRecipeLoading && <LinearProgress />}
        {!isRecipeLoading && recipe && 
          <Recipe 
            name={recipe.name}
            ingredients={recipe.ingredients}
            instructions={recipe.instructions}
          />
        }
        {!isRecipeLoading && recipeError && 
          <div>
            <h3>Recipe</h3>
            <div>Recipe not found</div>
          </div>
        }
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search, recipe } = state
  return { ...search, ...recipe }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      getRecipe: actions.getRecipe
    },
    dispatch
  )

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
