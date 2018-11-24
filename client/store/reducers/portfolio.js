import axios from "axios"
import "babel-polyfill" // might help fix /get not working

const GET_PORTFOLIO = "GET_PORTFOLIO"
const GET_UPDATED_PORTFOLIO = "GET_UPDATED_PORTFOLIO"
const CREATE_PORTFOLIO_ITEM = "CREATE_PORTFOLIO_ITEM"

const retrievePortfolio = portfolio => ({
  type: GET_PORTFOLIO,
  portfolio
})

const retrieveUpdatedPortfolio = updatedPortfolio => ({
  type: GET_UPDATED_PORTFOLIO,
  updatedPortfolio
})

const addPortfolioItem = portfolioItem => ({
  type: CREATE_PORTFOLIO_ITEM,
  portfolioItem
})

export const updateStock = (
  idAndNumShares,
  stockName,
  userId
) => async dispatch => {
  try {
    const newStock = {
      name: stockName,
      numShares: +idAndNumShares[1],
      userId: userId
    }
    const { data } = await axios.put(
      `/api/portfolio/${+idAndNumShares[0]}`,
      newStock
    )
    dispatch(retrieveUpdatedPortfolio(data))
  } catch (err) {
    console.error(err)
  }
}

export const createPortfolioItem = (
  company,
  numShares,
  userId
) => async dispatch => {
  try {
    const newPortfolioItem = { company, numShares, userId }
    const { data } = await axios.post(`/api/portfolio`, newPortfolioItem)
    dispatch(addPortfolioItem(data))
  } catch (err) {
    console.error(err)
  }
}

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
      return action.portfolio
    case GET_UPDATED_PORTFOLIO:
      return action.updatedPortfolio
    case CREATE_PORTFOLIO_ITEM:
      return state.concat(action.portfolioItem)
    default:
      return state
  }
}
