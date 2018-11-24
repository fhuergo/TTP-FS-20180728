import React, { Component } from "react"

const Portfolio = ({ portfolio }) => {
  return (
    <div>
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
