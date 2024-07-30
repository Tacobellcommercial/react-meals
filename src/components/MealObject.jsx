import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store/userSlice";
import { fetchApi } from "../fetchApi";

function MealObject(props){

    const dispatch = useDispatch();

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    const cart = useSelector(state=>{
        return state.user.cart;
    })

    return(
        <div className="meal-object">
            <div className="info">
                <h2>{props.name}</h2>
                <p>{props.price}$</p>
            </div>
            <div className="buttons">
                <button type="button" class="btn btn-outline-success" onClick={async (e)=>{
                    const randomId = Math.random();
                    if (loggedIn){
                        const token = localStorage.getItem("accessToken");
                        const response = await fetchApi("/add-item-to-cart", token, {name: props.name, price: props.price, id: randomId}, "POST")
                    }
                    dispatch(addItemToCart({name: props.name, price: props.price, id: randomId}))
                }}>Add +</button>
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
                }}>Remove -</button>
            </div>
        </div>
    )
}

export default MealObject;