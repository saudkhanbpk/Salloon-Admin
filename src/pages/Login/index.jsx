import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router';
import sideImge from "../../assets/imge/photo1.jpeg";

import logo from "../../assets/img/logo.png"
import emailIcon from "../../assets/icon/Icon ionic-ios-mail@2x.png";
import passwordIcon from "../../assets/icon/Icon feather-key@2x.png";
import AuthApi from '../../api/authApi'
import BtnLoader from '../../Componet/loaders/btnLoader';

import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
const SiginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required.'),
    password: Yup.string().min(6, 'Password is too Short!').required('Password is required.'),
    // terms: Yup.boolean().required('Required')
});

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            apiError: "",
            apiLoader: false
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('token')
        if (token) {
            this.props.history.push('/dashboard')
        }
    }
    responseGoogle = (response) => {
        console.log("google", response);
    }
    responseFacebook = (response) => {
        console.log("facebook", response);
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 px-0">
                        <div className="sideImgeContainer"

                        >
                            <img src={sideImge} />
                        </div>
                    </div>
                    <div className="col-md-6 LoginContainer bg-white">
                        <div className="logoContainer"
                        >
                            <img src={logo} />
                        </div>
                        <h3>Welcome Back Admin!</h3>
                        <p>
                            Find the latest and greatest saloons in your country and
                            avail the best services in areas at your nearest location
                        </p>

                        <div className="loginInerContainer">
                            {/* ***************** */}
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: '',
                                    terms: ''
                                }}
                                validationSchema={SiginSchema}
                                onSubmit={values => {
                                    // this.props.history.push("/dashboard")
                                    console.log("form submitted")
                                    console.log(values);
                                    // this.setState({ apiLoader: true, apiError: '' })
                                    values.role = 'admin'
                                    AuthApi.login(values).then(response => {
                                        if (response.data.Error == false) {
                                            localStorage.setItem("token", response.data.token)
                                            localStorage.setItem("profile", JSON.stringify(response.data.saloon))
                                            this.props.history.push("/dashboard")
                                        } else {
                                            this.setState({
                                                apiError: response.data.msg,
                                                apiLoader: false
                                            })
                                        }

                                    }).catch(error => {
                                        console.log("error")
                                        console.log(error)
                                        if (error.response && error.response.data && error.response.data.Error == true) {
                                            this.setState({
                                                apiError: error.response.data.msg,
                                                apiLoader: false
                                            })
                                        }

                                        // if(error.response.status==400){
                                        // }
                                    })
                                    // same shape as initial values

                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        {/* {JSON.stringify(values, null, 2)} */}
                                        <div className="loginInputs">
                                            <div>
                                                <div>
                                                    <img src={emailIcon} />
                                                </div>
                                                <div>

                                                    <Field type="email"
                                                        placeholder="abc@example.com"
                                                        name="email" />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <img src={passwordIcon} />
                                                </div>
                                                <div>
                                                    {/* <Field type="password"
                          placeholder="123456"
                          name="password" /> */}
                                                    {/* placeholder */}
                                                    <input type="password"
                                                        onChange={(e) => {
                                                            setFieldValue("password", e.target.value, true)
                                                        }}
                                                        placeholder="......"
                                                        value={values.passowrd}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-4 reminderContainer">
                                            <div>
                                                <div>  <Field type="checkbox" name="terms" />

                                                    Remember Me</div>
                                                <div><small className='text-danger '> <ErrorMessage name="terms" /></small></div>
                                            </div>
                                            <div>
                                                {/* <Link to="/forget">Forgot Password?</Link> */}
                                            </div>
                                        </div>
                                        <div className='text-danger '>
                                            <div>
                                                {this.state.apiError}
                                            </div>

                                            <div>  <ErrorMessage name="email" /> </div>
                                            <div>  <ErrorMessage name="password" /> </div>
                                        </div>
                                        {this.state.apiLoader && (<BtnLoader />)}
                                        {!this.state.apiLoader && (<div className="py-2 formBtns w-100">
                                            <div>
                                                <button type="submit" className="active">Login</button>
                                            </div>

                                        </div>
                                        )}



                                    </Form>
                                )}
                            </Formik>
                            {/* ***************** */}
                            <div className="py-2 formBtns mt-5">
                                <div
                                    onClick={() => this.props.history.push("/staff-login")}>
                                    <button type="submit" >Staff Login</button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => this.props.history.push("/login")}
                                    >Admin Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}

export default withRouter(Login)
