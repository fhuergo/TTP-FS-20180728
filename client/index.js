import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router } from "react-router-dom"
import store from "./store" // needs to be made

ReactDOM.render(<div>Hello world</div>, document.getElementById("app")) // I can put anything besides "app" and same error
