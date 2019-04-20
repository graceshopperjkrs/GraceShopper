import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

export const SingleProduct = props => {
  const {name, imageUrl,  id, description} = props.product
  const qty = props.path==='Cart' ? props.product.purchaseQuantity : props.qty
  const price = props.path === 'Cart' ? props.product.purchasePrice : props.product.price
 


 return ( 
    <div className="SingleProductBox">
     
  
     
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>

    
      <img src={imageUrl} />
      <h3>Price: ${price}</h3>

      { props.path === 'Cart' ? ''
         :  <p>Description: {description} </p>   }

        Edit Quantity: 
            <input type="Number" 
                   name="qty"
                   value= {qty}
                    min="0"
                    step="5"
                onChange={props.path=== 'Cart' ? 
                          (evt)=> props.handleEditCartChange(evt, props.product.productId):          props.handleAddProductChange}
                   />



      { (props.path === 'ProductDetailView')? 
       <div> 

          <button type="submit" 
          disabled={ (props.qty===0)}
          onClick={props.handleAddProductSubmit}>
              Add to Cart / Modify Qty
          </button>
          </div>
      :''}


    { props.path === 'Cart' ?
       <div >
          <div className="CartActionsBox">
              <i style={{height: 24 + 'px'}}
              className="fas fa-trash"
              onClick={()=>props.deleteItem(props.id)}/>  Remove Item
          </div>
        </div>
      :''}

    </div>
  )
}
