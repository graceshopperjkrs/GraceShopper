import React from 'react'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const SingleProduct = props => {
  const {name, imageUrl, price, id, description} = props.product
  console.log('singleproduct props', props.path)
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
                    min="0" 
                    max="400000"
                    step="5"
                onChange={props.handleAddProductChange}
                   />
          <button type="submit" 
          disabled={ (!props.qty)} 
          onClick={props.handleSubmit}>
        Add to Cart !
          </button>
          </div>
      :''}


    { props.path === 'Cart' ?
       <div >

          <div className="CartActionsBox">
          Quantity: 
            <input type="Number" 
                   name="qty" 
                   defaultValue={props.product.qty}
                    min="0" 
                    max="400000"
                    step="5"
                onChange={props.handleEditCartChange}
                   />
          <button type="submit" id="updateQty"
          disabled={ (!props.qty)} 
          onClick={props.handleEditCartSubmit}>
        Edit Quantity 
          </button>
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
