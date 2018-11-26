import React, { Fragment } from "react"
import Portfolio from "./Portfolio"
import BuyStocks from "./BuyStocks"

const PortfolioAndBuy = ({ portfolio, alreadyHasTheStock }) => {
  return (
    <Fragment>
      <div align="left">
        <Portfolio portfolio={portfolio} />
      </div>
      <div align="right">
        <BuyStocks alreadyHasTheStock={alreadyHasTheStock} />
      </div>
    </Fragment>
  )
}

export default PortfolioAndBuy
