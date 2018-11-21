import user from "./user"
import portfolio from "./portfolio"
import cash from "./cash"
import { combineReducers } from "redux"

export default combineReducers({ user, portfolio, cash })
