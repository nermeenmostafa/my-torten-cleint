import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import { Button } from "bootstrap";


function Navbar() {
    const { user, logOutUser } = useContext(AuthContext)


    return (
        <div>

            <nav sticky="top" className="navbar navbar-expand-lg shadow-lg p-0 mb-5 bg-white rounded ">
                <Link className="navbar-brand" to={"/"} href="#">Caramella</Link>
                <img className="logo" src="images/logo2-me.png" style={{ width: '80px', height: '80px' }}></img>
                <img className="logo" src="images/logo-me.png" style={{ width: '50px', height: '50px' }}></img>
                <img src="images/logo2-me.png" style={{ width: '80px', height: '80px' }}></img>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div>
                    {user && (<h4>{user.name} </h4>)}
                    {user?.isAdmin && <h5>ADMIN</h5>}
                </div>
                <div className="navbar-collapse collapse " id="navbarNav">

                    <ul className="navbar-nav ">

                        <li>
                            <Link
                                className="nav-link" href="#" to={"/cart"}>
                                <button
                                    style={{ width: "2rem", height: "2rem", position: "relative" }}
                                    variant="outline-primary"
                                    className="rounded-circle"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        fill="currentColor"
                                    >
                                        <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                                    </svg>

                                    <div
                                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                        style={{
                                            color: "white",
                                            width: "1rem",
                                            height: "1rem",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            transform: "translate(25%, 25%)",
                                        }}
                                    >

                                    </div>

                                </button>

                            </Link>


                        </li>
                        <li className="nav-item">
                            {user && user.isAdmin && <Link className="nav-link" href="#" to={"/tortes/add"}>
                                Add Torte
                            </Link>}

                        </li>
                        <li className="nav-item">
                            {user && user.isAdmin && <Link className="nav-link" href="#" to={"/userList"}>
                                Change User Roles
                            </Link>}

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#" to={"/comment"}>
                                Comments
                            </Link>
                        </li>

                        {user && (<li className="nav-link" onClick={logOutUser}>

                            logout

                        </li>)}
                        {!user && (<li className="nav-item" >

                            <Link className="nav-link" href="#" to={"/login"}>
                                login
                            </Link>



                        </li>)}
                        {!user && (<li className="nav-item" >

                            <Link className="nav-link" href="#" to={"/signup"}>
                                Signup
                            </Link>



                        </li>)}


                    </ul>
                </div>
            </nav >
        </div >

    )

}
export default Navbar;