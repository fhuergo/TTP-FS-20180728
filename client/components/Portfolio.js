import React, { Component } from "react"

const Portfolio = ({ portfolio, portfolioTotal }) => {
  if (typeof portfolioTotal !== "number") {
    portfolioTotal = 0
  }
  return (
    <div>
      Portfolio (${portfolioTotal.toFixed(2)})
      {portfolio.map((item, idx) => {
        return (
          <div key={idx}>
            {item.company} {item.numShares}
          </div>
        )
      })}
    </div>
  )
}

export default Portfolio
