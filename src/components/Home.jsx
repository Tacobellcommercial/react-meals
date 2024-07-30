import React from "react";
import { Link } from "react-router-dom";
import Meals from "./Meals";

function Home(){
    return(
        <>
            <div className="header">
                <h1>React Meals Demo</h1>
                <p>By Christopher Pray. Add items to cart and authenticate with ease.</p>
                <Link to="/register" type="button" className="btn btn-warning">Register</Link>
                <Link to="/login" type="button" className="btn btn-outline-warning">Login</Link>
            </div>

            <Meals/>
        </>
    )
}

export default Home;