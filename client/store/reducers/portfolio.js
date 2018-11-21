import axios from "axios"

const GET_PORTFOLIO = "GET_PORTFOLIO"

const retrievePortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

export const getPortfolio = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/portfolio/${userId}`)
    dispatch(retrievePortfolio(data))
  } catch (err) {
    console.error(err)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_PORTFOLIO:
      return portfolio
    default:
      return state
  }
}
