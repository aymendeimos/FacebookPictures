 /* eslint-disable */
import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin, notifState,checkEmail,checkPassword,submit,disableSubmitButton} from "./helper";

class userLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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
            case "loginForm":
                if (checkEmail(this) && checkPassword(this)) {
                    event.preventDefault();
                    submit("login",this.state.email,this.state.password);
                }
                break;
            default :
                break;
        }
        disableSubmitButton(self,"login");
    }


    render() {
        if(!this.state.logged){
            return (
                <div className="container">
                    <div className="container cardcontainer userregistration animated bounceInLeft">
                        <div className="row justify-content-center">
                            <div className="card col-lg-5 col-sm-8 col-md-8">
                                <form id="loginForm" className="card-block" onSubmit={this.handleChanges}>
                                    <div className="form-header elegant-color-dark">
                                        <h3> Log In</h3>
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
                                    <div className="text-center">
                                        <button className="btn waves-effect waves-light elegant-color-dark" type="submit"
                                                id="login" disabled>Log In
                                        </button>
                                        
                                        <Link to="/user-registration">
                                            <button className="btn waves-effect waves-light elegant-color-dark" type=""
                                                    id="SignUp">Go to SignUp
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

export default userLogin;