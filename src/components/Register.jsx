import React from "react";
import { fetchApi } from "../fetchApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Register(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const loggedIn = useSelector(state=>{
        return state.user.loggedIn;
    })

    React.useEffect(()=>{
        if (loggedIn){
            navigate("/");
        }
    }, [])

    return(
        <form className="register" onSubmit={async e=>{
            e.preventDefault();
            const data = await fetchApi("/create-user", false, {
                username: username,
                password: password
            })

            if (data.message == "User created successfully"){
                setSuccess(true);
                setError(false);
                setUsername("");
                setPassword("");
            }else{
                setError(true);
                setSuccess(false);
                setUsername("");
                setPassword("");
            }
        }}>
            {success && <p id="success">Success! Try logging in...</p>}
            {error && <p id="error">Error... Account already exists</p>}
            <h1>Register</h1>
            <input type="text" placeholder="Username..." onChange={e=>{
                setUsername(e.target.value);
            }} value={username}/>

            <input type="password" placeholder="Password..." onChange={e=>{
                setPassword(e.target.value);
            }} value={password}/>
            <button type="submit" class="btn btn-warning">Sign up</button>
        </form>
    )
}

export default Register;