import user from "./user"
import portfolio from "./portfolio"
import transactions from "./transaction"
import { combineReducers } from "redux"

export default combineReducers({ user, portfolio, transactions })
