import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://project-m-server-ufrw.onrender.com/";

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

   
    

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        const newUser = { email, password, name,isAdmin:false }

        axios.post('https://project-m-server-ufrw.onrender.com/auth/signup', newUser)
            .then(() => {
              
                navigate('/login')
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

                        <div className="SignupPage">
                            <h1>Sign Up</h1>

                            <form onSubmit={handleSignupSubmit}>
                                <div className="form-outline mb-6">
                                    <label className="form-label">Email:</label>
                                    <input className=" form-control form-control-lg"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleEmail}
                                    />

                                    <label className="form-label">Password:</label>
                                    <input className=" form-control form-control-lg"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handlePassword}
                                    />

                                    <label className="form-label">Name:</label>
                                    <input className=" form-control form-control-lg"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleName}
                                    />
                                </div>
                                <div className="justify-content-around align-items-center ">
                                    <div className="form-check mb-0"></div>
                                    <button type="submit">Sign Up</button>
                                </div>
                            </form>

                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <p>Already have account?</p>
                            <Link to={"/login"}> Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default SignupPage;