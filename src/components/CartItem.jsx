import React from "react";
import { fetchApi } from "../fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/userSlice";

function CartItem(props){

    let loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    let cart = useSelector(state=>{
        return state.user.cart;
    })

    const dispatch = useDispatch();

    return(
        <div className="cart-item">
            <div class="info">
                <h2>{props.name}</h2>
                <p>{props.price}$</p>
            </div>
            <div class="interact">
                <p>Amount: {props.amount}</p>
                <p>Total: {Math.round(props.amount*props.price)}$</p>
                <button type="button" class="btn btn-outline-success" onClick={async (e)=>{
                    const randomId = Math.random();
                    if (loggedIn){
                        const token = localStorage.getItem("accessToken");
                        const response = await fetchApi("/add-item-to-cart", token, {name: props.name, price: props.price, id: randomId}, "POST")
                    }
                    dispatch(addItemToCart({name: props.name, price: props.price, id: randomId}))
                }}>+</button>
                <button type="button" class="btn btn-outline-danger" onClick={async (e)=>{
                    let got = false;
                    let id = null;
                    cart.forEach(e=>{
                        if (e.name == props.name && !got){
                            got = true;
                            id = e.id;
                        }
                    }) 
                    if (loggedIn && id){
                        const token = localStorage.getItem("accessToken");
                        const response = await fetchApi("/remove-item-from-cart", token, {id: id}, "POST");
                    }

                    if (id){
                        dispatch(removeItemFromCart({id: id}))
                    }
                }}>-</button>

            </div>
        </div>
    )
}

export default CartItem;