import axios from "axios"

const GET_CASH = "GET_CASH"

const retrieveCash = cash => ({
  type: GET_CASH,
  cash
})

export const getCash = userId => async dispatch => {
  try {
    let hi = {}
    hi.data = "hello"
    const { data } = hi //await axios.get(`/api/cash/${userId}`) CASH UPDATE ON USER
    dispatch(retrieveCash(data))
  } catch (err) {
    console.error(err)
  }
}

export default (state = 5000, action) => {
  switch (action.type) {
    case GET_CASH:
      return cash
    default:
      return state
  }
}
