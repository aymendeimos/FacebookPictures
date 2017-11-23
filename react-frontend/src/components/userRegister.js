import React, {Component} from "react";

import {checkLogin,checkEmail,checkPassword,submit,checkConfirmPassword,disableSubmitButton} from "./helper"

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
            case "signupForm":
                if (checkEmail(this) && checkPassword(this) && checkConfirmPassword(this)) {
                    event.preventDefault();
                    submit(self,"signup",this.state.email,this.state.password);
                }
                break;
            default :
                break;
        }
        disableSubmitButton(self,"signup");
    }

    render() {
        if(!this.state.logged){
            return (
                <div className="container">
                    <div className="container cardcontainer userregistration  animated bounceInLeft" id="form">
                        <div className="row justify-content-center">
                            <div className="card col-lg-5 col-sm-8 col-md-8">
                                <form id="signupForm" className="card-block" onSubmit={this.handleChanges}>
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
                                        <button className="btn waves-effect waves-light elegant-color-dark" 
                                                type=""
                                                onClick={()=>{this.props.history.push("user-login")}}
                                                id="SignUp">Go to Log In
                                        </button>
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