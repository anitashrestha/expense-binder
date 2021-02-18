import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
//import PropTypes from "prop-types";



function RegistrationForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const sendDetailsToServer = () => {
        if (state.email.length && state.password.length) {
            props.showError(null);
            const payload = {
                "email": state.email,
                "password": state.password,
            }
            axios.post(API_BASE_URL + '/user/register', payload)
                .then(function (response) {
                    if (response.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login');
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }
    return (


        <div className="container-fluid align-items-center">

            <div className="row">
                <div className="col-md-6">
                    <div className="side-banner side-image"></div>
                </div>


                <div className="col-lg-push-5 col-lg-7 mt-8">
                    <div className="col-md-push-2 col-md-8 col-md-pull-2 col-xl-push-3 col-xl-6 col-xl-pull-3">
                    <div className="text-center">
                        <div className="register-header">
                            <h2>Welcome to Expense Binder</h2>
                            <div className="row mt-2 loginText-row">
                                <span className="textSmall">Already signed up? &nbsp;</span>
                                <span className="loginText" onClick={() => redirectToLogin()}>Log in</span>
                            </div>
                        </div>
                        <form className="registerForm">
                            <div className="form-group text-left">
                                {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Your email address"
                                    value={state.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                {/* <label htmlFor="exampleInputPassword1">Password</label> */}
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={state.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                {/* <label htmlFor="exampleInputPassword1">Confirm Password</label> */}
                                <input type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success btn-block"
                                onClick={handleSubmitClick}
                            >
                                Sign up
                            </button>


                        </form>

                        <div className="social-register-container">
                            <div>
                                <span>
                                    Or, continue with &nbsp;
                                </span>

                                <form method="post" action="" class="social-button-register" name="apple">
                                    <button aria-label="Connect with Apple" class="btn  btn-link p-x-0 oauth-btn-link" type="submit">
                                        <span>Apple</span>
                                    </button>
                                </form>
                                <span>, </span>
                                <form method="post" action="" class="social-button-register" name="google">
                                    <button aria-label="Connect with Google" class="btn  btn-link p-x-0 oauth-btn-link" type="submit">
                                        <span>Google</span>
                                    </button>
                                </form>
                                <span>, </span>
                                <form method="post" action="" class="social-button-register" name="facebook">
                                    <button aria-label="Connect with Facebook" class="btn  btn-link p-x-0 oauth-btn-link" type="submit">
                                        <span>Facebook</span>
                                    </button>
                                </form>
                                <hr class="m-y-1"></hr>
                            </div>
                        </div>

                        <div class="m-t-2">
                            <p class="m-b-1 text-xs-center small">
                                By signing up you agree to our <a href="/terms-and-conditions" target="_blank">Terms of Use</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                            </p>
                        </div>

                        <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                            {state.successMessage}
                        </div>


                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);