import React from "react"

const Portfolio = ({ portfolio }) => {
  portfolio = portfolio.sort((a, b) => {
    return a.id - b.id
  })
  return (
    <table>
      Portfolio
      {portfolio.map((item, idx) => {
        const { company, numShares, color, latestPrice } = item
        return (
          <tr key={idx}>
            <td>{company}</td>
            <td>{numShares}</td>
            <td>
              <font color={color}>{latestPrice.toFixed(2)}</font>
            </td>
            <td>{(numShares * latestPrice).toFixed(2)}</td>
          </tr>
        )
      })}
    </table>
  )
}

export default Portfolio
