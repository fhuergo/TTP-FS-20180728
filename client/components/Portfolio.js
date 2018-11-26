import React from "react"

const Portfolio = ({ portfolio }) => {
  return (
    <div>
      Portfolio
      <ul>
        {portfolio.map((item, idx) => {
          const { company, numShares, color, latestPrice } = item
          return (
            <li key={idx}>
              {company} {numShares} <font color={color}>{latestPrice}</font> (
              {(numShares * latestPrice).toFixed(2)})
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Portfolio
