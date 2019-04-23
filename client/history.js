//import createHistory from 'history/createBrowserHistory'
//import createMemoryHistory from 'history/createMemoryHistory'
const createMemoryHistory = require("history").createMemoryHistory
const createHistory = require('history').createBrowserHistory

const history =
  process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHistory()

export default history
