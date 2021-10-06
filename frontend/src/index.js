import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import reducers from "./reducers"
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedHome = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Home />
    </Provider>
  </BrowserRouter>

)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))
