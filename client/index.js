import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {Elements, StripeProvider} from 'react-stripe-elements'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      //TODO: Hide key in Heroku app.
      <StripeProvider apiKey="pk_test_ZTj9t26glwu3WoMuiOJpqQgr00cxP37jDf">
        <Elements>
          <App />
        </Elements>
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
