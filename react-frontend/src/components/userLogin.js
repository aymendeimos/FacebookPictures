 /* eslint-disable */
import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {checkLogin, notifState,checkEmail,checkPassword} from "./helper"

class userLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            logged : true
        };
        checkLogin(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disableSubmitButton = this.disableSubmitButton.bind(this);
    }

    disableSubmitButton() {
        if (checkEmail(this,false) && checkPassword(this,false)) {
            document.getElementById("login").disabled = false;
        } else {
            document.getElementById("login").disabled = true;
        }
    }

    handleChangeEmail(event) {
        this.state.email = event.target.value;
        checkEmail(this,true);
        this.disableSubmitButton();
    }

    handleChangePass(event) {
        this.state.password = event.target.value;
        checkPassword(this,true);
        this.disableSubmitButton();
    }

    handleSubmit(event) {
        if (checkEmail(this) && checkPassword(this)) {
            event.preventDefault();
            axios.post("http://localhost:4200/users/login", {
                email: this.state.email,
                password : this.state.password,
            })
            .then(res => {
                if(res.data.success){
                    notifState("success",res.data.message) ;
                    window.location = "/user-profile" ;
                }else{
                    notifState("warning",res.data.message) ;
                }
            })
            .catch(err => {
                notifState("danger","Internal error plz try again later");
            })
        }
    }


    render() {
        if(!this.state.logged){
            return (
                <div className="container">
                    <div className="container cardcontainer userregistration animated bounceInLeft">
                        <div className="row justify-content-center">
                            <div className="card col-lg-5 col-sm-8 col-md-8">
                                <form className="card-block" onSubmit={this.handleSubmit}>
                                    <div className="form-header elegant-color-dark">
                                        <h3> Log In</h3>
                                    </div>

                                    <div className="md-form" id="mail">
                                        <i className="fa fa-envelope prefix"/>
                                        <input type="text" id="form3" className="form-control"
                                            onChange={this.handleChangeEmail}/>
                                        <label id="form2">Your email</label>
                                        <p></p>
                                    </div>
                                    <div className="md-form" id="password">
                                        <i className="fa fa-lock prefix"/>
                                        <input name="firstpass" type="password" id="form4" className="form-control"
                                            onChange={this.handleChangePass}/>
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