import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

export const SingleProduct = props => {
  const {name, imageUrl, id, description} = props.product
  const qty = props.path === 'Cart' ? props.product.purchaseQuantity : props.qty
  const price =
    props.path === 'Cart' ? props.product.purchasePrice : props.product.price
  const productId =
    props.path === 'Cart' ? props.product.productId : props.product.id

  return (
    <div className="SingleProductBox">
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
        <img className="beanImage" src={imageUrl} />
      </Link>
      <h3>Price: ${price}</h3>

      {props.path === 'Cart' ? '' : <p>Description: {description} </p>}

      {props.path !== 'AllProducts' ? (
        <div>
          Edit Quantity:
          <input
            type="Number"
            name="qty"
            value={qty}
            min="0"
            step="5"
            onChange={
              props.path === 'Cart'
                ? evt => props.handleEditCartChange(evt, productId)
                : props.handleAddProductChange
            }
          />
        </div>
      ) : (
        ''
      )}

      {props.path === 'ProductDetailView' ? (
        <div>
          <button
            type="submit"
            disabled={props.qty === 0}
            onClick={props.handleAddProductSubmit}
          >
            Add to Cart / Modify Qty
          </button>
        </div>
      ) : (
        ''
      )}

      {props.path === 'Cart' ? (
        <div>
          <div className="CartActionsBox">
            <i
              className="fas fa-trash"
              onClick={() => props.deleteItem(productId)}
            />{' '}
            Remove Item
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
