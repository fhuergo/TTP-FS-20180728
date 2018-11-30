import { loadPortfolio } from "./portfolio"

const START_INTERVAL = "START_INTERVAL"
const END_INTERVAL = "END_INTERVAL"

const beginInterval = interval => ({
  type: START_INTERVAL,
  interval
})

// const endInterval = () => ({
//   type: END_INTERVAL
// })

export const startInterval = userId => async dispatch => {
  const interval = setInterval(function() {
    loadPortfolio(userId)
  }, 1000)
  dispatch(beginInterval(interval))
}

export default (state = {}, action) => {
  switch (action.type) {
    case START_INTERVAL:
      return action.interval
    case END_INTERVAL:
      return {}
    default:
      return state
  }
}
