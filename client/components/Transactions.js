import React from "react"

const Transactions = ({ transactions }) => {
  return (
    <div>
      Transactions
      <ul>
        {transactions.map((transaction, idx) => {
          const { company, numShares, price } = transaction
          return (
            <li key={idx}>
              BUY ({company.toUpperCase()}) - {numShares} Shares @ {price}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Transactions
