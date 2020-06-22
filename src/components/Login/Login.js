import React, { useState } from 'react';
import './Login.css';


const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');

    const authenticate = (event) => {
        event.preventDefault();
        console.log(userMail, userPass);
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1 className="title center">David's Library</h1>
                <form className="form login-form">
                    <div className="field">
                        <input 
                            type="email" 
                            name="email" 
                            className="login-input" 
                            value={userMail}
                            onChange={(event)=>{setUserMail(event.target.value)}} 
                            placeholder=""/>
                        <label htmlFor="email" className="label">Email</label>
                    </div>
                    <div className="field">
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                className="login-input"
                                placeholder=""
                                value={userPass}
                                onChange={(event)=>{setUserPass(event.target.value)}}  />
                            <label htmlFor="password" className="label">Password</label>
                            <span
                                className="toggle-password"
                                onMouseEnter={() => setShowPass(true)}
                                onMouseLeave={() => setShowPass(false)}>
                                {showPass ? '🙈' : '👁'}
                            </span>
                        </div>
                    <button type="submit" className="btn-lg" onSubmit={authenticate}>Sign In</button>
                </form>
            </div>
        </div>
    )
};

export default Login;
