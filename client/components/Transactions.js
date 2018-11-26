import React from "react"

const Transactions = ({ transactions }) => {
  return (
    <div>
      Transactions
      {transactions.map((transaction, idx) => {
        const { company, numShares, price } = transaction
        return (
          <div key={idx}>
            BUY ({company.toUpperCase()}) - {numShares} Shares @ {price}
          </div>
        )
      })}
    </div>
  )
}

export default Transactions
