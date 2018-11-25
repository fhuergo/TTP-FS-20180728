import React from "react"

const Portfolio = ({ portfolio }) => {
  console.log("portfolio in dumb component", portfolio)
  return (
    <div>
      Portfolio
      <ul>
        {portfolio.map((item, idx) => {
          const { company, numShares, color, latestPrice } = item
          return (
            <li key={idx}>
              {company} {numShares} <font color={color}>{latestPrice}</font>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Portfolio
