import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */

export const SingleProduct = props => {
  const {name, imageUrl, price, id, description} = props.product

 return ( 
    <div className="SingleProductBox">
     
  
     
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>

    
      <img src={imageUrl} />

      

      { (props.path === 'ProductDetailView')? 
       <div> 
         <h3>Price: ${price}</h3>
          <p>Description: {description} </p>    

            Quantity: 
            <input type="Number" 
                   name="qty" 
                  
                   value= {props.qty}
                    min="0" 
                    max="400000"
                    step="5"
                onChange={props.handleAddProductChange}
                   />
          <button type="submit" 
          disabled={ (props.qty===0)}
          onClick={props.handleAddProductSubmit}>
       Add to Cart / Modify Qty
          </button>
          </div>
      :''}


    { props.path === 'Cart' ?
       <div >
          <h3>Price: ${props.product.purchasePrice}</h3>
          <h3>  Quantity:   {props.product.purchaseQuantity} </h3>
          <div className="CartActionsBox">
         
            Edit Quantity: 
            <input type="number"
                   name="cartQty" 
                  
                   value = {props.product.purchaseQuantity}
                    min="0" 
                    step="5"
                onChange= {(evt)=> props.handleEditCartChange(evt, props.product.productId)}
                   />
      


          </div>
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
