import axios from "axios"
import "babel-polyfill" // needed or else runtime error with async function "me"
import history from "../../history"
import { runInNewContext } from "vm" // new automatic import; if there's a bug try commenting out
import { removePortfolio } from "../reducers/portfolio"
import { removeTransactions } from "../reducers/transaction"

export const GET_USER = "GET_USER"
export const REMOVE_USER = "REMOVE_USER"

export const getUser = user => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })

export const me = () => async dispatch => {
  try {
    const res = await axios.get("/auth/me")
    dispatch(getUser(res.data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (name, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { name, email, password }) // originally res = await axios.post(`/auth/login/${method}`, { email, password })
    // OKAY!! For login this is fine, but I wonder if it needs to be `auth/login/${method}` at other times. If that turns out ot be the case, we can do if method === login, run auth/method.
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post("/auth/logout")
    dispatch(removeUser())
    //history.push("/login") // commenting out due to error
  } catch (err) {
    console.error(err)
  }
}

// cash updates
export const updateUser = (userId, updatedUser) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/user/${+userId}/`, updatedUser)
    dispatch(getUser(data))
  } catch (err) {
    console.error(err)
  }
}
