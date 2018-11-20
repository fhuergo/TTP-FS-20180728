import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import store from "./store"
import createHistory from "history/createBrowserHistory"
const history = createHistory()

//ReactDOM.render(<div>Hello world</div>, document.getElementById("app"))
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
)
