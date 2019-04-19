import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
  const {name, imageUrl, price, id, description} = props.product
 // console.log('singleproduct props', props.path, props.product)
  return ( 
    <div className="SingleProductBox">
     
  
     
      <Link to={`/products/${id}`}>
        <h1>{name}</h1>
      </Link>

    
      <img src={imageUrl} />

      <h3>Price: ${price}</h3>

      { (props.path === 'ProductDetailView')? 
       <div> 
          <p>Description: {description} </p>    

            Quantity: 
            <input type="Number" 
                   name="qty" 
                   defaultValue="0"
                   value= {props.qty}
                    min="0" 
                    max="400000"
                    step="5"
                onChange={props.handleAddProductChange}
                   />
          <button type="submit" 
          onClick={props.handleAddProductSubmit}>
        Add to Cart !
          </button>
          </div>
      :''}


    { props.path === 'Cart' ?
       <div >

          <div className="CartActionsBox">
          Quantity:  
            <input type="number"
                   name="cartQty" 
                   defaultValue = {props.product.qty}
                   value = {props.qty}
                  
                    min="0" 
                    max="400000"
                    step="5"
                onInput={(evt)=> props.handleEditCartChange(evt, id)}
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
