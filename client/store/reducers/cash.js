import axios from "axios"

const GET_CASH = "GET_CASH"

const retrieveCash = cash => ({
  type: GET_CASH,
  cash
})

export const getCash = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cash/${userId}`)
    dispatch(retrieveCash(data))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_CASH:
      return cash
    default:
      return state
  }
}
