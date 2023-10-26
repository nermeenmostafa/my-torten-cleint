import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";



const API_URL = "https://project-m-server-ufrw.onrender.com/";

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { authenticateUser, isLoggedIn } = useContext(AuthContext)
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const userInfo = { email, password }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, userInfo)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('authToken', response.data.authToken)
                authenticateUser()

            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="images/loginphoto.png"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                        <h1>Login</h1>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="form-outline mb-4">
                                <label className="form-label">Email:</label>
                                <input className=" form-control form-control-lg"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmail}
                                />

                                <label className="form-label">Password:</label>
                                <input className="form-control form-control-lg"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </div>
                            <div className="justify-content-around align-items-center ">

                                <div className="form-check mb-0"></div>
                                <button type="submit" to={"/"}>Login</button>
                            </div>

                        </form>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        <p>Don't have an account yet?</p>
                        <Link to={"/signup"}> Sign Up</Link>

                        <div
                            className="text-center justify-content-between py-4 px-4 px-xl-5 ">
                            <div className="text-pink mb-3 mb-md-0">
                                Copyright © 2023. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )

};

export default LoginPage;