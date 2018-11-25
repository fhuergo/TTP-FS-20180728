import React from "react"

const Portfolio = ({ portfolio }) => {
  console.log("portfolio", portfolio)
  return (
    <div>
      Portfolio
      <ul>
        {portfolio.map((item, idx) => {
          const { company, numShares, color, latestPrice } = item
          console.log(`latestPrice is ${latestPrice}, color is ${color}`)
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
