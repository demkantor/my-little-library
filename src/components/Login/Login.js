import React from 'react';
import './Login.css';


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1 className="title center">David's Library</h1>
                <form className="form login-form">
                    <input type="email" />
                    <input type="password" />
                    <input type="submit" value="Sign In" />
                </form>
            </div>
        </div>
    )
};

export default Login;
