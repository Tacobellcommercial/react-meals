import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import { fetchApi } from "../fetchApi";

import Cart from "./Cart";

function Navbar(){

    const [cartToggle, setCartToggle] = React.useState(false);

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    const cart = useSelector(state=>{
        return state.user.cart;
    })

    const dispatch = useDispatch();

    React.useEffect(()=>{
        async function logInCheck(){
            const token = localStorage.getItem("accessToken")
            if (token && !loggedIn){
                const userCartObject = await fetchApi("/get-cart", token, false, "GET");
                if (userCartObject){
                    dispatch(login({cart: userCartObject.userCart}))
                }
            }
        }

        logInCheck();
    }, [])

    return(
        <>        
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" id="header-brand">React Meals</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            {!loggedIn ?
                                <>
                                    <li className="nav-item">
                                        <Link to="/register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/login">Login</Link>
                                    </li>
                                </>
                            :
                                <li className="nav-item">
                                    <button onClick={e=>{
                                        localStorage.removeItem("accessToken");
                                        dispatch(logout());
                                    }}>Logout</button>
                                </li>
                            }
                            <li className="nav-item">
                                <button onClick={(e)=>{
                                    setCartToggle(!cartToggle);
                                }}>Cart: {cart.length}</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {cartToggle && <Cart setCartStatus={setCartToggle}/>}
            <Outlet/>
        </>
    )
}

export default Navbar;