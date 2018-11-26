import axios from "axios"
import "babel-polyfill" // might help fix /get not working

const GET_PORTFOLIO = "GET_PORTFOLIO"
const GET_UPDATED_PORTFOLIO = "GET_UPDATED_PORTFOLIO"
const CREATE_PORTFOLIO_ITEM = "CREATE_PORTFOLIO_ITEM"

const getLatestPrice = async data => {
  if (!Array.isArray(data)) {
    let companyData
    try {
      companyData = await axios.get(
        `https://api.iextrading.com/1.0/stock/${data.company.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
      )
    } catch (err) {
      console.error(err)
    }
    const { latestPrice, open } = companyData.data.quote
    data.latestPrice = latestPrice
    if (latestPrice > open) {
      data.color = "green"
    } else if (latestPrice < open) {
      data.color = "red"
    } else {
      data.color = "grey"
    }
  } else {
    for (let i = 0; i < data.length; i++) {
      let companyData
      try {
        companyData = await axios.get(
          `https://api.iextrading.com/1.0/stock/${data[
            i
          ].company.toLowerCase()}/batch?types=quote,news,chart&range=1m&last=10`
        )
      } catch (err) {
        console.error(err)
        continue
      }
      const { latestPrice, open } = companyData.data.quote
      data[i].latestPrice = latestPrice
      if (latestPrice > open) {
        data[i].color = "green"
      } else if (latestPrice < open) {
        data[i].color = "red"
      } else {
        data[i].color = "grey"
      }
    }
  }
  return data
}

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
    let { data } = await axios.put(
      `/api/portfolio/${+idAndNumShares[0]}`,
      newStock
    )
    data = await getLatestPrice(data)
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
    let { data } = await axios.post(`/api/portfolio`, newPortfolioItem)
    data = await getLatestPrice(data)
    dispatch(addPortfolioItem(data))
  } catch (err) {
    console.error(err)
  }
}

export const getPortfolio = userId => async dispatch => {
  try {
    let { data } = await axios.get(`/api/portfolio/${userId}`)
    data = await getLatestPrice(data)
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
