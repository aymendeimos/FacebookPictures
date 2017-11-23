/* eslint-disable */
import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin,notifState,checkEmail,checkPassword,submit,checkConfirmPassword,disableSubmitButton}from "./helper"

class userRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            logged : true
        };

        checkLogin(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChanges(event){
        let self = this;
        switch (event.target.id) {
            case "form3":
                self.state.email = event.target.value;
                checkEmail(self,true);
                break;

            case "form4":
                self.state.password = event.target.value;
                checkPassword(self,true);
                break;

            case "form5":
                self.state.confirmPassword = event.target.value;
                checkConfirmPassword(self,true);
                break;
        }
        disableSubmitButton(self,"signup");
    }

    handleSubmit(event) {
        if (checkEmail(this) && checkPassword(this) && checkConfirmPassword(this)) {
            event.preventDefault();
            submit("signup",this.state.email,this.state.password);
        }
    }


    render() {
        if(!this.state.logged){
            return (
                <div className="container">
                    <div className="container cardcontainer userregistration  animated bounceInLeft" id="form">
                        <div className="row justify-content-center">
                            <div className="card col-lg-5 col-sm-8 col-md-8">
                                <form className="card-block" onSubmit={this.handleSubmit}>
                                    <div className="form-header elegant-color-dark">
                                        <h3> Register</h3>
                                    </div>

                                    <div className="md-form" id="mail">
                                        <i className="fa fa-envelope prefix"/>
                                        <input type="text" id="form3" className="form-control"
                                            onChange={this.handleChanges}/>
                                        <label id="form2">Your email</label>
                                        <p></p>
                                    </div>
                                    <div className="md-form" id="password">
                                        <i className="fa fa-lock prefix"/>
                                        <input name="firstpass" type="password" id="form4" className="form-control"
                                            onChange={this.handleChanges}/>
                                        <label id="form4">Your password</label>
                                        <p></p>
                                    </div>
                                    <div className="md-form" id="confirmpassword">
                                        <i className="fa fa-lock prefix"/>
                                        <input name="confirmpass" type="password" id="form5" className="form-control"
                                            onChange={this.handleChanges}/>
                                        <label id="form4">Confirm password</label>
                                        <p></p>
                                    </div>

                                    <div className="text-center">
                                        <button className="btn waves-effect waves-light elegant-color-dark" type="submit"
                                                id="signup" disabled>Sign up
                                        </button>
                                        <Link to="/user-login">
                                            <button className="btn waves-effect waves-light elegant-color-dark" type=""
                                                    id="SignUp">Go to Log In
                                            </button>
                                        </Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return( 
                <div>

                </div> 
            );
        }
    }
}

export default userRegister;