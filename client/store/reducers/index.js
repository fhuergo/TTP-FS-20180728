import user from "./user"
import portfolio from "./portfolio"
import transactions from "./transaction"
import interval from "./interval"
import { combineReducers } from "redux"

const appReducer = combineReducers({ user, portfolio, transactions, interval })

const rootReducer = (state, action) => {
  if (action.type === "REMOVE_USER") {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
