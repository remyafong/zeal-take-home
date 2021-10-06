import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE } from "../actions"

const initialState = {
  recipe: null,
  isRecipeLoading: false,
  recipeError: null,
}

const recipeFetching = (state) => {
  return { ...state, isRecipeLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isRecipeLoading: false, recipe: payload }
}

const recipeFailed = (state, payload) => {
  return { ...state, isRecipeLoading: false, recipeError: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching()
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    default:
      return state
  }
}
