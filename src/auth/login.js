import React, { useState } from 'react';
import { getToken } from '../Actions/BackendActions';
import "../styles/elements.css";

const Login = (props) => {
    const [state, setState] = useState({"username": "", "password": ""});

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Call login api to get user token
        const userData = await getToken(state.username, state.password);

        if (userData) {
            // Put token in local storage
            props.setToken(userData.token);
        } else {
            alert("Invalid username or password")
            setState({ ...state, username: "", password: "" })
        }
    }

    return (
        <div>
            <h1 className='heading_main auth-heading'>Log In</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label className='form-label'>Username</label>
                    <input className='form-input' type="text" name="username" value={state.username} required />
                <label className='form-label'>Password</label>
                    <input className='form-input' type="password" name="password" value={state.password} required />
                <input className='btn-primary' type="submit" value="Log in" />
            </form>
        </div>
    )
}
export default Login;