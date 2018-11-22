import axios from "axios"

const GET_PORTFOLIO = "GET_PORTFOLIO"

const retrievePortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

export const getPortfolio = userId => async dispatch => {
  try {
    let bye = { data: "bye" }
    const { data } = dispatch(retrievePortfolio(data)) // await axios.get(`/api/portfolio/${userId}`)
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
