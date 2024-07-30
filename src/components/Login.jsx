import React from "react";
import { fetchApi } from "../fetchApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/userSlice";

function Login(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    React.useEffect(()=>{
        if (loggedIn){
            navigate("/");
        }
    }, [])


    return(
        <form className="register" onSubmit={async (e)=>{

            e.preventDefault();
            const data = await fetchApi("/login", false, {
                username: username,
                password: password
            })
            if (data.message == "Token created, logged in..."){
                localStorage.setItem("accessToken", data.token);
                const userCartObject = await fetchApi("/get-cart", data.token, false, "GET");
                dispatch(login({cart: userCartObject.userCart}))
                navigate("/");
            }else{
                setError(true);
            }
        }}>
            <h1>Login</h1>
            {error && <p id="error">Wrong username or password...</p>}
            <input type="text" placeholder="Enter username..." onChange={(e)=>{
                setUsername(e.target.value);
            }} value={username}/>
            <input type="password" placeholder="Enter password..." onChange={(e)=>{
                setPassword(e.target.value);
            }} value={password}/>
            <button type="submit" class="btn btn-warning">Login</button>
        </form>
    )
}

export default Login;