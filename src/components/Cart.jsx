import React from "react";
import { useSelector } from "react-redux";

import CartItem from "./CartItem";

function Cart(props){


    const cartList = useSelector(state=>{
        return state.user.cart;
    })

    const mealsList = useSelector(state=>{
        return state.meals;
    })

    function ReturnCartItems(){
        const cartItemsToReturn = [];
        
        cartList.forEach(cartItem=>{
            let itemAlreadyFound = false;
            cartItemsToReturn.forEach(arrayItem=>{
                if (cartItem.name == arrayItem.name){
                    itemAlreadyFound = true;
                    arrayItem.amount = arrayItem.amount + 1;
                }
            })

            if (!itemAlreadyFound){
                cartItemsToReturn.push({name: cartItem.name, price: cartItem.price, amount: 1})
            }
        })

        const cartComponentsToReturn = [];

        cartItemsToReturn.forEach(e=>{
            cartComponentsToReturn.push(<CartItem name={e.name} price={e.price} amount={e.amount}/>)
        })

        return cartComponentsToReturn;
    }

    return(
        <div className="cart">
            <div class="cart-content">
                <h1>Cart</h1>
                <ReturnCartItems/>

                <button type="button" class="btn btn-outline-danger" onClick={(e)=>{
                   props.setCartStatus(false);
                }}>Close</button>
            </div>
        </div>
    )
}

export default Cart;