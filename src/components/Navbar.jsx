import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function navbar() {

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
                <a className="navbar-brand" href="#">Karamella</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse " id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item  ">
                            <a className="nav-link" href="#">
                                login
                                </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Cart
                                </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    )

}
export default navbar;