import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit() {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) {
      await axios.put('/api/cart/', {
        orderId: this.props.props.cart[0].orderId
      })
      this.props.props.fetchItems()
      this.setState({complete: true})
    }
  }

  render() {
    if (this.state.complete) {
      alert('Thank you for your purchase!')
      return <Redirect to="/home" />
    }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

const IPayment = injectStripe(CheckoutForm)

export default IPayment
