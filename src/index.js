import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store/store";


import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Error from "./components/Error";
import Register from "./components/Register";
import Login from "./components/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar/>,
        errorElement: <Error/>,
        children :[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {path: "/login",
                element: <Login/>
            }
        ]
    }
])

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)