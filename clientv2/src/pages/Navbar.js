import React, { useState } from "react";
import '../styles/Navbar.css'
import Register from './Register'
import Login from "./Login";


function Navbar () {

    const [registerModal,setRegisterModal] = useState(false);
    const [loginModal,setLoginModal] = useState(false);

    return(
       <div className="navbar">
            <div className="navbar-item">
                <div className="logo">
                    Notes
                </div>
                <div className="navbar-items">
                    <a href="/" className="register-button" onClick={(e) => {
                        e.preventDefault()
                        setRegisterModal(!registerModal)
                        if(loginModal) setLoginModal(!loginModal)
                        
                        }}>Register</a>
                    <a href="/" className="login-button" onClick={(e) => {
                        e.preventDefault()
                        setLoginModal(!loginModal)
                        if(registerModal)setRegisterModal(!registerModal)
                        }}>Login</a>
                </div>
                {registerModal? <Register/>: ""}
                {loginModal? <Login setLoginModal= {setLoginModal}/>: ""}
            </div>
            
       </div>
)}

export default Navbar