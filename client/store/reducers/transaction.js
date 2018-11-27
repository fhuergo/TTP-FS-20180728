import axios from "axios"

const GET_TRANSACTIONS = "GET_TRANSACTIONS"
const CLEAR_TRANSACTIONS = "CLEAR_TRANSACTIONS"

const getAllTransactions = allTransactions => ({
  type: GET_TRANSACTIONS,
  allTransactions
})

const clearTransactions = () => ({
  type: CLEAR_TRANSACTIONS
})

export const retrieveTransactions = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/transaction/${userId}`)
    dispatch(getAllTransactions(data))
  } catch (err) {
    console.error(err)
  }
}

export const createTransaction = (
  company,
  numShares,
  price,
  userId
) => async dispatch => {
  try {
    const newTransaction = { company, numShares, price, userId }
    const { data } = await axios.post(`/api/transaction`, newTransaction)
    dispatch(getAllTransactions(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeTransactions = () => dispatch => {
  dispatch(clearTransactions())
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.allTransactions
    case CLEAR_TRANSACTIONS:
      return []
    default:
      return state
  }
}
